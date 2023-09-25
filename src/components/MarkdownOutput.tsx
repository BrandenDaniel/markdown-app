"use client";

import { useEffect } from "react";
import ViewToggle from "./ViewToggle";
import { roboto_mono } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function MarkdownOutput() {
  const { currentFile } = useMarkdownInputContext();

  useEffect(() => {
    const rawOutput = document.getElementById(
      "markdown-output"
    )! as HTMLTextAreaElement;

    rawOutput.value = currentFile.content;

    let markDownOutput: string[] = [];

    let lines = rawOutput.value.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("#")) {
        markDownOutput.push(`<h1>${lines[i]}</h1>`);
      }
      markDownOutput.push(lines[i]);
    }
    console.log(markDownOutput);
  }, [currentFile]);

  return (
    <section className="markdown markdown--output">
      <ViewToggle type="output" />
      <textarea
        id="markdown-output"
        name=""
        className={roboto_mono.className}
      ></textarea>
    </section>
  );
}
