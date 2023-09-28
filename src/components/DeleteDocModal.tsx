import { useMarkdownInputContext } from "@/context/markdown-input-context";
import { roboto, roboto_slab } from "@/lib/fonts";
import React, { MouseEvent } from "react";

export default function DeleteDocModal() {
  const { data, currentFile, setRemovedFileIndex } = useMarkdownInputContext();
  const modal = document.getElementById("modal") as HTMLDialogElement;

  const handleCloseModal = (e: MouseEvent<HTMLDialogElement>) => {
    e.preventDefault();
    modal.close();
  };

  const handleDeleteCurrentFIle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const currentFileId = currentFile.id;
    const getFileIndex = data.findIndex((file) => file.id === currentFileId);
    setRemovedFileIndex(getFileIndex);
    modal.close();
  };

  return (
    <dialog
      id="modal"
      className={`deleteDocModal ${roboto_slab.className}`}
      onClick={handleCloseModal}
    >
      <form onClick={(e) => e.stopPropagation()}>
        <h1>Delete this document?</h1>
        <p>
          Are you sure you want to delete the ‘{currentFile.name}.md’ document
          and its contents? This action cannot be reversed.
        </p>

        <button
          type="submit"
          onClick={handleDeleteCurrentFIle}
          className={roboto.className}
        >
          Confirm & Delete
        </button>
      </form>
    </dialog>
  );
}
