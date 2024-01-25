"use client";

import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";

export default function Menu() {
  const {
    state: { displayNavigation },
    dispatch,
  } = useAppContext();

  return (
    <Button
      icon={LuPanelLeft}
      className={`${displayNavigation ? "hidden" : "block"} fixed left-2 top-2`}
      variant="outline"
      onClick={() =>
        dispatch({
          type: ActionType.UPDATE,
          field: "displayNavigation",
          value: true,
        })
      }
    />
  );
}
