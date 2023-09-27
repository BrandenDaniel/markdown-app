"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import { useState, ChangeEvent, MouseEvent, FormEvent } from "react";

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
            <button className="nav__delete">
              <Image src={DeleteIcon} alt="delete markdown" />
            </button>
            <button className="nav__save" onClick={handleSaveFile}>
              <Image src={SaveIcon} alt="save markdown" />
            </button>
          </div>
        </form>
      </nav>
    </>
  );
}
