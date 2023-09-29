"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Data from "../data/data.json";

// Provider elements within
type MarkdownInputContextProviderProps = {
  children: React.ReactNode;
};

type DataStructure = {
  id: number;
  createdAt: string;
  name: string;
  content: string;
};

type MarkdownInputContext = {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  data: typeof Data;
  setData: React.Dispatch<React.SetStateAction<typeof Data>>;
  currentFile: DataStructure;
  setCurrentFile: React.Dispatch<React.SetStateAction<DataStructure>>;
  removedFileIndex: number | null;
  setRemovedFileIndex: React.Dispatch<React.SetStateAction<number | null>>;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarActive: boolean;
  setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
  isNotifierShown: boolean;
  setIsNotifierShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MarkdownInputContext = createContext<MarkdownInputContext | null>(
  null
);

export default function MarkdownInputContextProvider({
  children,
}: MarkdownInputContextProviderProps) {
  //stored variables
  const storedTheme = localStorage.getItem("theme");
  const storedData = localStorage.getItem("files");
  const storedCurrentFile = localStorage.getItem("currentFile");

  //states
  const [theme, setTheme] = useState(storedTheme ? storedTheme : "light");
  const [data, setData] = useState(
    storedData ? JSON.parse(storedData) : [...Data]
  );
  const [currentFile, setCurrentFile] = useState<DataStructure>(
    storedCurrentFile ? JSON.parse(storedCurrentFile) : Data[0]
  );
  const [removedFileIndex, setRemovedFileIndex] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  const [isNotifierShown, setIsNotifierShown] = useState(false);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("currentFile", JSON.stringify(currentFile));
  }, [currentFile]);

  useEffect(() => {
    if (removedFileIndex !== null && currentFile.id > 1) {
      let newData = [...data];
      newData.splice(removedFileIndex, 1); // Remove 1 item at index removedFileIndex
      setData(newData);
      setCurrentFile(newData[0]);

      setRemovedFileIndex(null); // Reset removedFileIndex
    }
  }, [removedFileIndex]);

  return (
    <MarkdownInputContext.Provider
      value={{
        theme,
        setTheme,
        data,
        setData,
        currentFile,
        setCurrentFile,
        removedFileIndex,
        setRemovedFileIndex,
        showPreview,
        setShowPreview,
        isSidebarActive,
        setIsSidebarActive,
        isNotifierShown,
        setIsNotifierShown,
      }}
    >
      {children}
    </MarkdownInputContext.Provider>
  );
}

export function useMarkdownInputContext() {
  const context = useContext(MarkdownInputContext);

  if (!context) {
    throw new Error(
      "MarkdownInputContext must be used within a MarkdownInputContextProvider"
    );
  }

  return context;
}
