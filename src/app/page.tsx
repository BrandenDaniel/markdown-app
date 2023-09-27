"use client";

import MarkdownInput from "@/components/MarkdownInput";
import MarkdownOutput from "@/components/MarkdownOutput";
import Notifier from "@/components/Notifier";
import { useMarkdownInputContext } from "@/context/markdown-input-context";
import React from "react";

export default function page() {
  const { showPreview } = useMarkdownInputContext();

  return (
    <main
      className={`container ${showPreview ? "show-preview" : "hide-preview"}`}
    >
      <Notifier />
      <MarkdownInput></MarkdownInput>
      <MarkdownOutput></MarkdownOutput>
    </main>
  );
}
