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
import { useState, useEffect } from "react";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function Sidebar({
  isSidebarActive,
}: {
  isSidebarActive: boolean;
}) {
  const [theme, setTheme] = useState("light");
  const { data, setData, currentFile, setCurrentFile } =
    useMarkdownInputContext();

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();

  let day = currentDate.getDate();
  let month = monthNames[currentDate.getMonth()];
  let year = currentDate.getFullYear();

  const createNewFile = () => {
    setData([
      ...data,
      {
        id: data.length + 1,
        createdAt: `${day} ${month} ${year}`,
        name: "untitled.md",
        content: "",
      },
    ]);

    const latestFile = data.slice(-1);

    setCurrentFile(latestFile[0]);
  };

  const handleActiveFile = () => {};

  return (
    <aside
      className={`sidebar ${roboto.className} ${
        isSidebarActive ? "sidebar--open" : ""
      }`}
    >
      <Image src={Logo} alt="Markdown logo" />
      <p>MY DOCUMENTS</p>
      <button onClick={createNewFile}>+ New Document</button>

      <div className="sidebar__document">
        {data.map((file) => (
          <div className="sidebar__document-item" key={file.id}>
            <Image src={FileIcon} alt="document" />
            <div>
              <span>{file.createdAt}</span>
              <button onClick={handleActiveFile}>{file.name}</button>
            </div>
          </div>
        ))}
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
