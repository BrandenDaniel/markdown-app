import ShowPreviewIcon from "../assets/icon-show-preview.svg";
import HidePreviewIcon from "../assets/icon-hide-preview.svg";
import Image from "next/image";
import { roboto } from "@/lib/fonts";

export default function ViewToggle({ type }: { type: string }) {
  return (
    <div className={`viewToggle ${roboto.className}`}>
      <span>{type === "input" ? "MARKDOWN" : "PREVIEW"}</span>
      <button>
        <Image
          src={type === "input" ? ShowPreviewIcon : HidePreviewIcon}
          alt={type === "input" ? "show preview" : "hide preview"}
        />
      </button>
    </div>
  );
}
