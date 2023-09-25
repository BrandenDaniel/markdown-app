"use client";

import { useEffect } from "react";
import ViewToggle from "./ViewToggle";
import { roboto_slab } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function MarkdownOutput() {
  const { currentFile } = useMarkdownInputContext();
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
  const orderedListPattern = /^\d+\.\s/; // Regular expression to match lines starting with a number followed by a period and space

  let lines = rawOutput.split("\n");
  let output: React.ReactNode[] = [];
  let currentOrderedList: React.ReactNode[] | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith(h1)) {
      output.push(<h1 key={i}>{line.replace(h1, "")}</h1>);
    } else if (line.startsWith(h2)) {
      output.push(<h2 key={i}>{line.replace(h2, "")}</h2>);
    } else if (line.startsWith(h3)) {
      output.push(<h3 key={i}>{line.replace(h3, "")}</h3>);
    } else if (line.startsWith(h4)) {
      output.push(<h4 key={i}>{line.replace(h4, "")}</h4>);
    } else if (line.startsWith(h5)) {
      output.push(<h5 key={i}>{line.replace(h5, "")}</h5>);
    } else if (line.startsWith(h6)) {
      output.push(<h6 key={i}>{line.replace(h6, "")}</h6>);
    } else if (line.startsWith(bold) && line.endsWith(bold)) {
      output.push(<b key={i}>{line.replaceAll(bold, "")}</b>);
    } else if (
      line.startsWith(italic) &&
      !line.startsWith(bold) &&
      line.endsWith(italic)
    ) {
      output.push(<i key={i}>{line.replaceAll(italic, "")}</i>);
    } else if (line.startsWith(blockquote)) {
      output.push(
        <div className="markdown__blockquote" key={i}>
          {line.replace(blockquote, "")}
        </div>
      );
    } else if (orderedListPattern.test(line)) {
      // Line starts with a number and period, indicating an ordered list
      if (!currentOrderedList) {
        currentOrderedList = [];
      }
      currentOrderedList.push(
        <li key={i}>{line.replace(orderedListPattern, "")}</li>
      );

      // Check the next line
      let nextIndex = i + 1;
      while (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        if (orderedListPattern.test(nextLine)) {
          currentOrderedList.push(
            <li key={nextIndex}>{nextLine.replace(orderedListPattern, "")}</li>
          );
          nextIndex++;
        } else {
          break;
        }
      }

      output.push(
        <ol key={i} start={1}>
          {currentOrderedList}
        </ol>
      );

      currentOrderedList = null;
      i = nextIndex - 1; // Skip processed lines
    } else {
      output.push(<p key={i}>{line}</p>);
    }
  }

  return (
    <section className={`markdown markdown--output ${roboto_slab.className}`}>
      <ViewToggle type="output" />
      <div className="markdown__content" id="markdown-output">
        {output}
      </div>
    </section>
  );
}
