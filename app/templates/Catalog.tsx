"use client";

// Client island for the templates catalog. Owns the filter tab state, renders
// the trade groups + cards. Server page handles metadata, JSON-LD, hero, FAQ.

import { useState } from "react";
import Link from "next/link";
import type { TemplateProduct } from "@/lib/templates";

type Trade = { id: TemplateProduct["trade"]; label: string };

export function Catalog({
  templates,
  trades,
}: {
  templates: TemplateProduct[];
  trades: Trade[];
}) {
  type Filter = TemplateProduct["trade"] | "all";
  const [active, setActive] = useState<Filter>("all");

  const groups: Trade[] =
    active === "all" ? trades : trades.filter((t) => t.id === active);

  return (
    <>
      <div className="t-filter-tabs" role="tablist" aria-label="Filter templates by trade">
        <button
          type="button"
          role="tab"
          aria-selected={active === "all"}
          className={"t-filter-tab" + (active === "all" ? " t-filter-tab--active" : "")}
          onClick={() => setActive("all")}
        >
          All
        </button>
        {trades.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active === t.id}
            className={"t-filter-tab" + (active === t.id ? " t-filter-tab--active" : "")}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {groups.map((trade) => {
        const items = templates.filter((t) => t.trade === trade.id);
        if (!items.length) return null;
        return (
          <div key={trade.id} className="t-trade-group">
            <h3 className="t-trade-h">
              <span className="t-trade-tag">{trade.label}</span>
            </h3>
            <div className="t-card-grid">
              {items.map((t) => (
                <Link
                  key={t.id}
                  href={`/templates/${t.slug}`}
                  className={"t-card" + (t.featured ? " t-card--featured" : "")}
                >
                  {t.featured && <span className="t-card-flag">Most picked</span>}
                  <div className="t-card-head">
                    <span className="t-card-trade">{t.tradeLabel}</span>
                    <span className="t-card-price">{t.priceLabel}</span>
                  </div>
                  <h4 className="t-card-name">{t.name}</h4>
                  <p className="t-card-short">{t.short}</p>
                  <p className={"t-card-roi" + (t.roi ? "" : " t-card-roi--todo")}>
                    Saves ~
                    <span>{t.roi?.hoursPerWeek ?? "TODO(jason)"}</span> hrs/week —
                    pays for itself in{" "}
                    <span>{t.roi?.payoffDays ?? "TODO(jason)"}</span> days.
                  </p>
                  <div className="t-card-foot">
                    <span className="t-card-setup">{t.setupDays}</span>
                    <span className="t-card-arrow">See template →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}
