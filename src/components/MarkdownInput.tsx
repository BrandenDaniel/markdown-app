import React from "react";
import ViewToggle from "./ViewToggle";
import { roboto_mono } from "@/lib/fonts";

export default function MarkdownInput() {
  return (
    <section className="markdown markdown--input">
      <ViewToggle type="input" />
      <textarea name="" className={roboto_mono.className}></textarea>
    </section>
  );
}
