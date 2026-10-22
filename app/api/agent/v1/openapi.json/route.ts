import { NextResponse } from 'next/server';
import { SITE } from '@/lib/site';

export const runtime = 'nodejs';

function baseUrl(): string {
  return process.env.AGENT_API_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || SITE.url;
}

export function GET() {
  return NextResponse.json({
    openapi: '3.1.0',
    info: {
      title: 'Jason Walls Consulting Agent API',
      version: '1.0.0',
      description:
        'Catalog of engagements (free), each marked with its pricing status, plus a metered scoping brief that names the right tier, the budget fit and what is out of scope. Send Authorization: Bearer <key> for metered calls.',
    },
    servers: [{ url: baseUrl() }],
    'x-pricing': {
      currency: 'usd',
      model: 'per-interaction, prepaid balance',
      tools: [
        { tool: 'catalog', path: '/api/agent/v1/catalog', priceCents: 0 },
        { tool: 'scope_brief', path: '/api/agent/v1/scope', priceCents: 200 },
      ],
    },
    components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
    paths: {
      '/api/agent/v1/catalog': {
        get: {
          operationId: 'consultingCatalog',
          summary: 'List every engagement tier with its price and pricing status. Free.',
          responses: { '200': { description: 'Catalog' } },
        },
      },
      '/api/agent/v1/scope': {
        post: {
          operationId: 'scopeBrief',
          summary:
            'Buy a written scoping brief for a project: recommended engagement, budget verdict and out-of-scope list. Costs $2.00 per call.',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['goal'],
                  properties: {
                    goal: { type: 'string', description: 'What the client wants built, in a sentence or two.' },
                    budgetUsd: { type: 'number' },
                    ongoing: { type: 'boolean', description: 'true for a monthly retainer rather than a one-time project' },
                    company: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            '200': { description: 'Scoping brief' },
            '401': { description: 'Missing or unknown API key' },
            '402': { description: 'Prepaid balance exhausted' },
          },
        },
      },
    },
  });
}
