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
  data: typeof Data;
  setData: React.Dispatch<React.SetStateAction<typeof Data>>;
  currentFile: DataStructure;
  setCurrentFile: React.Dispatch<React.SetStateAction<DataStructure>>;
  showPreview: boolean;
  setShowPreview: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarActive: boolean;
  setIsSidebarActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MarkdownInputContext = createContext<MarkdownInputContext | null>(
  null
);

export default function MarkdownInputContextProvider({
  children,
}: MarkdownInputContextProviderProps) {
  const storedData = localStorage.getItem("files");
  const storedCurrentFile = localStorage.getItem("currentFile");
  const [data, setData] = useState(
    storedData ? JSON.parse(storedData) : [...Data]
  );
  const [currentFile, setCurrentFile] = useState<DataStructure>(
    storedCurrentFile ? JSON.parse(storedCurrentFile) : Data[0]
  );
  const [showPreview, setShowPreview] = useState(false);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  useEffect(() => {
    localStorage.setItem("files", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem("currentFile", JSON.stringify(currentFile));
  }, [currentFile]);

  return (
    <MarkdownInputContext.Provider
      value={{
        data,
        setData,
        currentFile,
        setCurrentFile,
        showPreview,
        setShowPreview,
        isSidebarActive,
        setIsSidebarActive,
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
