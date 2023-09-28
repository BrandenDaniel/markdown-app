"use client";

import { ChangeEvent, useEffect } from "react";
import ViewToggle from "./ViewToggle";
import { roboto_mono } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function MarkdownInput() {
  const { currentFile, setCurrentFile, setIsSidebarActive } =
    useMarkdownInputContext();

  useEffect(() => {
    const textarea = document.getElementById(
      "markdown-input"
    )! as HTMLTextAreaElement;
    textarea.value = currentFile.content;
  }, [currentFile]);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentFile({ ...currentFile, content: e.currentTarget.value });
  };

  return (
    <section className="markdown markdown--input">
      <ViewToggle type="input" />
      <textarea
        id="markdown-input"
        name=""
        className={roboto_mono.className}
        onChange={handleContentChange}
      ></textarea>
    </section>
  );
}
