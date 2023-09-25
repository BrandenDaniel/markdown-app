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
  const bold = "**";
  const italic = "*";
  const blockquote = ">";
  // const orderedList = "";

  let lines = rawOutput.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith(h1)) {
      markDownOutput.push(`<h1>${lines[i].replace(h1, "")}</h1>`);
    } else if (lines[i].startsWith(h2)) {
      markDownOutput.push(`<h2>${lines[i].replace(h2, "")}</h2>`);
    } else if (lines[i].startsWith(h3)) {
      markDownOutput.push(`<h3>${lines[i].replace(h3, "")}</h3>`);
    } else {
      markDownOutput.push(`<p>${lines[i]}</p>`);
    }
  }

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
          } else {
            return <p>{line}</p>;
          }
        })}
      </div>
    </section>
  );
}
