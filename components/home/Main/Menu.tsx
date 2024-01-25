"use client";

import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";

export default function Menu() {
  const {
    state: { displayNavigation },
    setState,
  } = useAppContext();

  return (
    <Button
      icon={LuPanelLeft}
      className={`${displayNavigation ? "hidden" : "block"} fixed left-2 top-2`}
      variant="outline"
      onClick={() => setState({ displayNavigation: true })}
    />
  );
}
