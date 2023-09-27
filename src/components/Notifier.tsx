"use client";

import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function Notifier() {
  const { isNotifierShown } = useMarkdownInputContext();

  return isNotifierShown && <div className="notifier">Changes saved.</div>;
}
