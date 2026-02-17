"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  RECOMMENDED_TOOLS,
  PRESETS,
  type PresetKey,
} from "@/lib/calculator";

interface RecommendedToolsProps {
  preset: PresetKey;
}

export function RecommendedTools({ preset }: RecommendedToolsProps) {
  const tools = RECOMMENDED_TOOLS[preset];
  const regionLabel = PRESETS[preset].label;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10">
          <MapPin className="size-4 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-extrabold text-foreground">
            Recommended Tools for {regionLabel}
          </h2>
          <p className="text-[11px] text-muted-foreground">
            Based on your detected location. Placeholder links only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tools.map((tool) => (
          <div
            key={tool.name}
            className="flex flex-col justify-between rounded-xl border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-extrabold text-foreground">
                  {tool.name}
                </p>
                <Badge
                  variant="outline"
                  className="border-primary/20 bg-accent text-[9px] font-bold text-accent-foreground"
                >
                  {tool.tag}
                </Badge>
              </div>
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
            </div>
            <a
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {tool.cta}
              <ExternalLink className="size-3" />
            </a>
          </div>
        ))}
      </div>

      <p className="text-center text-[10px] text-muted-foreground/60">
        Links are placeholders for demonstration. We are not affiliated with any of these products.
      </p>
    </div>
  );
}
