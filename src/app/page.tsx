"use client";

import DeleteDocModal from "@/components/DeleteDocModal";
import MarkdownInput from "@/components/MarkdownInput";
import MarkdownOutput from "@/components/MarkdownOutput";
import Notifier from "@/components/Notifier";
import { useMarkdownInputContext } from "@/context/markdown-input-context";
import React from "react";

export default function page() {
  const { showPreview, setIsSidebarActive } = useMarkdownInputContext();

  return (
    <main
      className={`container ${showPreview ? "show-preview" : "hide-preview"}`}
      onClick={() => setIsSidebarActive(false)}
    >
      <Notifier />
      <DeleteDocModal />
      <MarkdownInput></MarkdownInput>
      <MarkdownOutput></MarkdownOutput>
    </main>
  );
}
