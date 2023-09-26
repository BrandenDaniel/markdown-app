import ShowPreviewIcon from "../assets/icon-show-preview.svg";
import HidePreviewIcon from "../assets/icon-hide-preview.svg";
import Image from "next/image";
import { roboto } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function ViewToggle({ type }: { type: string }) {
  const { showPreview, setShowPreview } = useMarkdownInputContext();

  return (
    <div className={`viewToggle ${roboto.className}`}>
      <span>{type === "input" ? "MARKDOWN" : "PREVIEW"}</span>
      <button
        onClick={(e) => {
          e.preventDefault();
          setShowPreview((prev) => !prev);
        }}
      >
        <Image
          src={showPreview ? HidePreviewIcon : ShowPreviewIcon}
          alt={type === "input" ? "show preview" : "hide preview"}
        />
      </button>
    </div>
  );
}
