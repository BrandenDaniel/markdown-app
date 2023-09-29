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
import { useEffect, MouseEvent } from "react";
import { useMarkdownInputContext } from "@/context/markdown-input-context";

export default function Sidebar() {
  const {
    data,
    setData,
    setCurrentFile,
    isSidebarActive,
    setIsSidebarActive,
    theme,
    setTheme,
  } = useMarkdownInputContext();

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // useEffect(() => {
  //   setCurrentFile(data[0]);
  // }, [data]);

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
    const newData = [
      {
        id: data.length + 1,
        createdAt: `${day} ${month} ${year}`,
        name: `untitled-${data.length}`,
        content: "Begin by typing your markdown here...",
      },
      ...data,
    ];
    setData(newData);
    setCurrentFile(newData[0]);
    document.getElementById("name-input")?.focus();
  };

  const handleActiveFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = parseInt(e.currentTarget.id);
    const getFileIndex = data.findIndex((file) => file.id === id);
    setCurrentFile(data[getFileIndex]);
    setIsSidebarActive(false);
  };

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
              <button
                onClick={handleActiveFile}
                id={`${file.id}`}
                className="sidebar__update"
                key={file.name}
              >
                {file.name}
              </button>
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
