"use client";

import { ChangeEvent, useEffect } from "react";
import ViewToggle from "./ViewToggle";
import { roboto_mono } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function MarkdownInput() {
  const { data, setData, currentFile, setCurrentFile } =
    useMarkdownInputContext();

  useEffect(() => {
    const textarea = document.getElementById(
      "markdown-input"
    )! as HTMLTextAreaElement;
    textarea.value = currentFile.content;
  }, []);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {};

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
