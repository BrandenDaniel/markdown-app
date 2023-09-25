import React from "react";
import ViewToggle from "./ViewToggle";
import { roboto_mono } from "@/lib/fonts";

export default function MarkdownOutput() {
  return (
    <section className="markdown markdown--output">
      <ViewToggle type="output" />
      <textarea name="" className={roboto_mono.className}></textarea>
    </section>
  );
}
