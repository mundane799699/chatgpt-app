"use client";

import React from "react";
import Menubar from "./Menubar";
import { useAppContext } from "@/components/AppContext";

export default function Navigation() {
  const {
    state: { displayNavigation },
  } = useAppContext();

  return (
    <nav
      className={`${
        displayNavigation ? "block" : "hidden"
      } h-full w-[260px] bg-gray-900 text-gray-300 p-2`}
    >
      <Menubar />
    </nav>
  );
}
