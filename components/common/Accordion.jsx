"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** items: [{ id?, title, content }] */
export default function Accordion({ items, defaultOpen = 0, allowMultiple = false }) {
  const baseId = useId();
  const [open, setOpen] = useState(defaultOpen === null ? [] : [defaultOpen]);

  const toggle = (index) =>
    setOpen((current) => {
      if (current.includes(index)) return current.filter((i) => i !== index);
      return allowMultiple ? [...current, index] : [index];
    });

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open.includes(index);
        const triggerId = `${baseId}-t-${index}`;
        const panelId = `${baseId}-p-${index}`;
        return (
          <div key={item.id || index} className={cn("accordion__item", isOpen && "is-open")}>
            <h3 className="mb-0" style={{ fontSize: "inherit" }}>
              <button
                type="button"
                id={triggerId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
              >
                <span>{item.title}</span>
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={triggerId} className="accordion__panel" hidden={!isOpen}>
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
