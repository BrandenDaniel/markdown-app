"use client";

import Image from "next/image";

//fonts
import { roboto } from "@/lib/fonts";

//icons
import Logo from "../../assets/logo.svg";
import FileIcon from "../../assets/icon-document.svg";
import DarkModeIcon from "../../assets/icon-dark-mode.svg";
import LightModeIcon from "../../assets/icon-light-mode.svg";
import DarkModeIconActive from "../../assets/icon-dark-mode-active.svg";
import LightModeIconActive from "../../assets/icon-light-mode-active.svg";
import { useState } from "react";

export default function Sidebar({
  isSidebarActive,
}: {
  isSidebarActive: boolean;
}) {
  const [theme, setTheme] = useState("light");

  return (
    <aside
      className={`sidebar ${roboto.className} ${
        isSidebarActive ? "sidebar--open" : ""
      }`}
    >
      <Image src={Logo} alt="Markdown logo" />
      <p>MY DOCUMENTS</p>
      <button>+ New Document</button>

      <div className="sidebar__document">
        <div className="sidebar__document-item">
          <Image src={FileIcon} alt="document" />
          <div>
            <span>01 April 2022</span>
            <p>untitled-document.md</p>
          </div>
        </div>
        <div className="sidebar__document-item">
          <Image src={FileIcon} alt="document" />
          <div>
            <span>01 April 2022</span>
            <p>untitled-document.md</p>
          </div>
        </div>
      </div>

      <div className="sidebar__theme-toggle">
        <label htmlFor="theme-toggle">
          <Image
            src={theme === "dark" ? DarkModeIconActive : DarkModeIcon}
            alt=""
          />
        </label>
        <input
          type="checkbox"
          id="theme-toggle"
          onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          checked={theme === "light" ? true : false}
        />
        <label htmlFor="theme-toggle">
          <Image
            src={theme === "light" ? LightModeIconActive : LightModeIcon}
            alt=""
          />
        </label>
      </div>
    </aside>
  );
}
