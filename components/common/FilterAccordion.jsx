"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Checkbox, Radio } from "./Input";

/** Collapsible sidebar filter box. */
export function FilterBox({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section className="filter-box">
      <button type="button" className="filter-box__head" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        {title}
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      <div id={id} className="filter-box__body" hidden={!open}>
        {children}
      </div>
    </section>
  );
}

/** Single-select radio list with optional counts. options: [{ value, label, count? }] */
export function RadioFilter({ title, name, options, value, onChange, scroll = false, defaultOpen }) {
  const list = options.map((opt) => (
    <Radio key={opt.value} name={name} label={opt.label} count={opt.count} checked={value === opt.value} onChange={() => onChange(opt.value)} />
  ));
  return (
    <FilterBox title={title} defaultOpen={defaultOpen}>
      {scroll ? <div className="filter-box__scroll">{list}</div> : list}
    </FilterBox>
  );
}

/** Multi-select checkbox list with "see more". */
export function CheckboxFilter({ title, options, values, onToggle, limit = 6, defaultOpen }) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? options : options.slice(0, limit);
  return (
    <FilterBox title={title} defaultOpen={defaultOpen}>
      {visible.map((opt) => (
        <Checkbox key={opt.value} label={opt.label} count={opt.count} checked={values.includes(opt.value)} onChange={() => onToggle(opt.value)} />
      ))}
      {options.length > limit && (
        <button type="button" className="filter-box__more" onClick={() => setExpanded((e) => !e)}>
          {expanded ? "− see less" : "+ see more"}
        </button>
      )}
    </FilterBox>
  );
}

/** State select + submit, as on the reference "Locations" box. */
export function LocationFilter({ states, value, onSubmit }) {
  const [draft, setDraft] = useState(value);
  const id = useId();
  return (
    <FilterBox title="Locations">
      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(draft);
        }}
      >
        <div className="field">
          <label className="field__label" htmlFor={id}>
            State
          </label>
          <select id={id} className="select" value={draft} onChange={(e) => setDraft(e.target.value)}>
            <option value="">Select State</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn--primary btn--block">
          Submit
        </button>
      </form>
    </FilterBox>
  );
}
