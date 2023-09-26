"use client";

import MarkdownInput from "@/components/MarkdownInput";
import MarkdownOutput from "@/components/MarkdownOutput";
import { useMarkdownInputContext } from "@/context/markdown-input-context";
import React from "react";

export default function page() {
  const { showPreview } = useMarkdownInputContext();

  return (
    <main
      className={`container ${showPreview ? "show-preview" : "hide-preview"}`}
    >
      <MarkdownInput></MarkdownInput>
      <MarkdownOutput></MarkdownOutput>
    </main>
  );
}
