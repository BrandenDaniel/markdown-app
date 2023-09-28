"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import { ChangeEvent, MouseEvent, FormEvent } from "react";

// icons
import HamburgerIcon from "../../assets/icon-menu.svg";
import CloseIcon from "../../assets/icon-close.svg";
import DeleteIcon from "../../assets/icon-delete.svg";
import SaveIcon from "../../assets/icon-save.svg";
import FileIcon from "../../assets/icon-document.svg";
import Logo from "../../assets/logo.svg";

//fonts
import { roboto } from "@/lib/fonts";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function Nav() {
  const {
    currentFile,
    setCurrentFile,
    data,
    setData,
    isSidebarActive,
    setIsSidebarActive,
    setIsNotifierShown,
  } = useMarkdownInputContext();

  const handleFileNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentFile({ ...currentFile, name: e.currentTarget.value });
  };

  const handleSaveFile = (
    e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const currentFileIndex = data.findIndex(
      (file) => file.id === currentFile.id
    );

    const updatedData = [...data];
    updatedData[currentFileIndex] = currentFile;
    setData(updatedData);
    handleNotifier();
  };

  const handleNotifier = () => {
    setIsNotifierShown(true);

    const displayNotifier = () => {
      setIsNotifierShown(false);
    };

    const notifierTimeout = setTimeout(displayNotifier, 2500);

    function clearNotifierTimeout() {
      clearTimeout(notifierTimeout);
    }
  };

  const handleOpenDeleteDocModal = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const modal = document.querySelector(
      ".deleteDocModal"
    ) as HTMLDialogElement;

    modal.showModal();
  };

  return (
    <>
      <Sidebar />
      <nav className="nav">
        <button
          className="nav__toggler"
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          <Image
            src={isSidebarActive ? CloseIcon : HamburgerIcon}
            alt="toggler button"
          />
        </button>
        <div className="nav__logo">
          <Image src={Logo} alt="Markdown logo" />
        </div>
        <form onSubmit={handleSaveFile}>
          <div className="nav__file-name">
            <Image src={FileIcon} alt="document" />
            <div className={roboto.className}>
              <span>Document Name</span>
              <input
                type="text"
                value={currentFile.name}
                onChange={handleFileNameChange}
              />
            </div>
          </div>
          <div className="nav__cta">
            <button
              className="nav__delete"
              type="button"
              onClick={handleOpenDeleteDocModal}
              disabled={currentFile.id === 1 ? true : false}
            >
              <Image src={DeleteIcon} alt="delete markdown" />
            </button>
            <button
              className="nav__save"
              onClick={handleSaveFile}
              type="submit"
            >
              <Image src={SaveIcon} alt="save markdown" />
            </button>
          </div>
        </form>
      </nav>
    </>
  );
}
