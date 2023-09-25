import MarkdownInput from "@/components/MarkdownInput";
import MarkdownOutput from "@/components/MarkdownOutput";
import React from "react";

export default function page() {
  return (
    <main className="container">
      <MarkdownInput></MarkdownInput>
      <MarkdownOutput></MarkdownOutput>
    </main>
  );
}
