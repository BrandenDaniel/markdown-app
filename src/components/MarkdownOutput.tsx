"use client";

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
  const blockquote = "> ";
  const orderedListPattern = /^\d+\.\s/;
  const unorderedListPattern = /^- /;
  const codeBlockPattern = /^```/;

  let lines = rawOutput.split("\n");
  let output: React.ReactNode[] = [];
  let currentOrderedList: React.ReactNode[] | null = null;
  let currentUnorderedList: React.ReactNode[] | null = null;
  let isInsideCodeBlock = false;
  let codeBlockContent: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (isInsideCodeBlock) {
      if (codeBlockPattern.test(line)) {
        //end of code block
        isInsideCodeBlock = false;

        const codeBlock = (
          <pre key={i} className="markdown__codeblock">
            <code>{codeBlockContent.join("\n")}</code>
          </pre>
        );

        output.push(codeBlock);

        codeBlockContent = []; //reset
      } else {
        codeBlockContent.push(line);
      }
    } else {
      if (codeBlockPattern.test(line)) {
        isInsideCodeBlock = true;
      } else {
        const inlineCodeBlocks = line.split(/(`[^`]+`)/);
        const contentWithInlineCodeblocks = inlineCodeBlocks.map(
          (part, index) => {
            if (index % 2 === 0) {
              return part;
              // This part is not inside backticks
            } else {
              // This part is inside backticks, so wrap it in <code> elements
              const codeContent = part.substring(1, part.length - 1); // Remove backticks
              return <code key={index}>{codeContent}</code>;
            }
          }
        );

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
                <li key={nextIndex}>
                  {nextLine.replace(orderedListPattern, "")}
                </li>
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
          i = nextIndex - 1; // Skip already processed lines
        } else if (unorderedListPattern.test(line)) {
          if (!currentUnorderedList) {
            currentUnorderedList = [];
          }

          currentUnorderedList.push(
            <li key={i}>{line.replace(unorderedListPattern, "")}</li>
          );

          // Check the next line
          let nextIndex = i + 1;
          while (nextIndex < lines.length) {
            const nextLine = lines[nextIndex];
            if (unorderedListPattern.test(nextLine)) {
              currentUnorderedList.push(
                <li key={nextIndex}>
                  {nextLine.replace(unorderedListPattern, "")}
                </li>
              );
              nextIndex++;
            } else {
              break;
            }
          }

          output.push(<ul key={i}>{currentUnorderedList}</ul>);
          i = nextIndex - 1; // Skip already processed lines
          currentUnorderedList = null;
        } else if (line === "") {
          output.push(<div className="markdown__empty-line" key={i}></div>);
        } else {
          output.push(
            <p key={i} className="markdown__paragraph">
              {contentWithInlineCodeblocks}
            </p>
          );
        }
      }
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
