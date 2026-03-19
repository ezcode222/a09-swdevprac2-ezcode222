"use client";

import { ReactNode, useState } from "react";

export default function InteractiveCard({
  children,
}: {
  children: ReactNode;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`rounded-lg transition-all duration-200 ${
        isHover ? "shadow-2xl bg-neutral-200" : "shadow-lg bg-white"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </div>
  );
}