"use client";

import Image from "next/image";
import Sidebar from "./Sidebar";
import { useState } from "react";

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
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const { currentFile, setCurrentFile } = useMarkdownInputContext();

  return (
    <>
      <Sidebar isSidebarActive={isSidebarActive} />
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
        <div className="nav__file-name">
          <Image src={FileIcon} alt="document" />
          <div className={roboto.className}>
            <span>Document Name</span>
            <input type="text" value={currentFile.name} />
          </div>
        </div>
        <div className="nav__cta">
          <button className="nav__delete">
            <Image src={DeleteIcon} alt="delete markdown" />
          </button>
          <button className="nav__save">
            <Image src={SaveIcon} alt="save markdown" />
          </button>
        </div>
      </nav>
    </>
  );
}
