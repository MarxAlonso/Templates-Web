"use client";

import { useState, useCallback } from "react";

export function useAcordeon() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  return { openIndex, toggle };
}
