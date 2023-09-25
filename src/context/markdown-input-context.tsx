"use client";

import React, { createContext, useContext, useState } from "react";
import Data from "../data/data.json";

// Provider elements within
type MarkdownInputContextProviderProps = {
  children: React.ReactNode;
};

type DataStructure = {
  createdAt: string;
  name: string;
  content: string;
};

type MarkdownInputContext = {
  data: typeof Data;
  setData: React.Dispatch<React.SetStateAction<typeof Data>>;
  currentFile: DataStructure;
  setCurrentFile: React.Dispatch<React.SetStateAction<DataStructure>>;
};

export const MarkdownInputContext = createContext<MarkdownInputContext | null>(
  null
);

export default function MarkdownInputContextProvider({
  children,
}: MarkdownInputContextProviderProps) {
  const [data, setData] = useState([...Data]);
  const lastFile = data.slice(-1);
  const [currentFile, setCurrentFile] = useState<DataStructure>(lastFile[0]);

  return (
    <MarkdownInputContext.Provider
      value={{ data, setData, currentFile, setCurrentFile }}
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
