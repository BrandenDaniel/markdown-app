"use client";

import Image from "next/image";

// icons
import HamburgerIcon from "../../assets/icon-menu.svg";
import CloseIcon from "../../assets/icon-close.svg";
import DeleteIcon from "../../assets/icon-delete.svg";
import SaveIcon from "../../assets/icon-save.svg";
import FileIcon from "../../assets/icon-document.svg";

//fonts
import { roboto } from "@/lib/fonts";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function Nav() {
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  return (
    <>
      <Sidebar isSidebarActive={isSidebarActive} />
      <nav className="nav">
        <button
          className="nav__hamburger"
          onClick={() => setIsSidebarActive(!isSidebarActive)}
        >
          <Image
            src={isSidebarActive ? CloseIcon : HamburgerIcon}
            alt="hamburger button"
          />
        </button>
        <div className={`nav__file-name ${roboto.className}`}>
          <Image src={FileIcon} alt="document" />
          example.md
        </div>
        <div>
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
