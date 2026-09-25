"use client";

import { useState } from "react";

export function Reveal({
  label = "Show answer key",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md border border-line bg-white px-3 py-1.5 text-[12px] font-bold text-teal-deep hover:border-teal"
      >
        {open ? "Hide answer" : label}
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
