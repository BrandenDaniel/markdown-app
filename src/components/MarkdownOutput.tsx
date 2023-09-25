"use client";

import { useEffect } from "react";
import ViewToggle from "./ViewToggle";
import { roboto_slab } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function MarkdownOutput() {
  const { currentFile } = useMarkdownInputContext();
  let markDownOutput: string[] = [];
  const rawOutput = currentFile.content;

  const h1 = "# ";
  const h2 = "## ";
  const h3 = "### ";
  const h4 = "#### ";
  const h5 = "##### ";
  const h6 = "###### ";
  const bold = "**";
  const italic = "*";
  const blockquote = "> ";
  const orderedList = "1. ";

  let lines = rawOutput.split("\n");

  return (
    <section className={`markdown markdown--output ${roboto_slab.className}`}>
      <ViewToggle type="output" />
      <div className="markdown__content" id="markdown-output">
        {lines.map((line, index) => {
          if (line.startsWith(h1)) {
            return <h1>{line.replace(h1, "")}</h1>;
          } else if (line.startsWith(h2)) {
            return <h2>{line.replace(h2, "")}</h2>;
          } else if (line.startsWith(h3)) {
            return <h3>{line.replace(h3, "")}</h3>;
          } else if (line.startsWith(h4)) {
            return <h4>{line.replace(h4, "")}</h4>;
          } else if (line.startsWith(h5)) {
            return <h5>{line.replace(h5, "")}</h5>;
          } else if (line.startsWith(h6)) {
            return <h6>{line.replace(h6, "")}</h6>;
          } else if (line.startsWith(bold) && line.endsWith(bold)) {
            return <b>{line.replaceAll(bold, "")}</b>;
          } else if (
            line.startsWith(italic) &&
            !line.startsWith(bold) &&
            line.endsWith(italic)
          ) {
            return <i>{line.replaceAll(italic, "")}</i>;
          } else if (line.startsWith(blockquote)) {
            return (
              <div className="markdown__blockquote">
                {line.replace(blockquote, "")}
              </div>
            );
          } else if (line.startsWith()) {
          } else {
            return <p>{line}</p>;
          }
        })}
      </div>
    </section>
  );
}
