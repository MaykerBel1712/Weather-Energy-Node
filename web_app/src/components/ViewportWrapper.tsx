// app/components/ViewportWrapper.tsx
"use client";

import { useViewportHeight } from "@/hooks/useViewportHeight";

export default function ViewportWrapper({ children }: { children: React.ReactNode }) {
  useViewportHeight();

  return (
    <div className="flex flex-col h-[calc(var(--vh,1vh)_*_100)]">
      {children}
    </div>
  );
}
