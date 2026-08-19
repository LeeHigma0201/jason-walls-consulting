/**
 * Per-interaction metering for the headless agent API.
 *
 * Event-sourced on purpose: the ledger is the only writable state, and a balance is
 * always a fold over it. That makes every invoice line reproducible from the file,
 * and makes double-billing a visible duplicate rather than a silent decrement.
 *
 * Copy of the ChargeRight module (src/lib/agent-meter.ts), product id swapped.
 * Storage is a local JSONL file for this proof. The production swap is one module:
 * keys -> Supabase table, ledger -> Stripe meter events (billing.meter_event).
 */
import { appendFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { randomUUID } from 'crypto';

export interface AgentKey {
  key: string;
  callerId: string;
  name: string;
  prepaidCents: number;
}

export interface LedgerEntry {
  id: string;
  ts: string;
  callerId: string;
  product: string;
  tool: string;
  priceCents: number;
}

const ROOT = process.env.AGENT_METER_DIR || join(process.cwd(), '.agent-meter');
const KEYS = join(ROOT, 'keys.json');
const LEDGER = join(ROOT, 'ledger.jsonl');

export const PRODUCT = 'consulting';

export function loadKeys(): AgentKey[] {
  if (!existsSync(KEYS)) return [];
  return JSON.parse(readFileSync(KEYS, 'utf8')) as AgentKey[];
}

export function readLedger(): LedgerEntry[] {
  if (!existsSync(LEDGER)) return [];
  return readFileSync(LEDGER, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => JSON.parse(l) as LedgerEntry);
}

export function spentCents(callerId: string): number {
  return readLedger()
    .filter((e) => e.callerId === callerId)
    .reduce((sum, e) => sum + e.priceCents, 0);
}

export function balanceCents(key: AgentKey): number {
  return key.prepaidCents - spentCents(key.callerId);
}

export type AuthResult =
  | { ok: true; key: AgentKey; balanceCents: number }
  | { ok: false; status: 401 | 402; error: string; balanceCents?: number };

export interface Billed {
  entry: LedgerEntry;
  balanceCents: number;
}

/**
 * Check the key and the balance WITHOUT writing a ledger line.
 *
 * Split from commit() on purpose: a caller must never be billed for a request that
 * fails validation. Handlers authorize, then validate, then commit — so a malformed
 * body costs nothing and a 402 is decided before any work runs.
 */
export function authorize(authHeader: string | null, priceCents: number): AuthResult {
  const presented = (authHeader || '').replace(/^Bearer\s+/i, '').trim();
  if (!presented) return { ok: false, status: 401, error: 'missing API key' };

  const key = loadKeys().find((k) => k.key === presented);
  if (!key) return { ok: false, status: 401, error: 'unknown API key' };

  const balance = balanceCents(key);
  if (balance < priceCents) {
    return {
      ok: false,
      status: 402,
      error: `insufficient balance: this call costs ${priceCents}c, balance is ${balance}c`,
      balanceCents: balance,
    };
  }
  return { ok: true, key, balanceCents: balance };
}

/** Write the ledger line. Called only once the request is known to be serviceable. */
export function commit(
  key: AgentKey,
  tool: string,
  priceCents: number,
  product: string = PRODUCT
): Billed {
  const entry: LedgerEntry = {
    id: randomUUID(),
    ts: new Date().toISOString(),
    callerId: key.callerId,
    product,
    tool,
    priceCents,
  };
  mkdirSync(ROOT, { recursive: true });
  appendFileSync(LEDGER, JSON.stringify(entry) + '\n');
  return { entry, balanceCents: balanceCents(key) };
}

export function meterHeaders(b: Billed): Record<string, string> {
  return {
    'X-Meter-Call-Id': b.entry.id,
    'X-Meter-Tool': b.entry.tool,
    'X-Meter-Price-Cents': String(b.entry.priceCents),
    'X-Meter-Balance-Cents': String(b.balanceCents),
  };
}
