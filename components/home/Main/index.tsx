import React from "react";
import Menu from "./Menu";
import Welcome from "./Welcome";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function Main() {
  return (
    <div className="relative flex-1">
      <main className="overflow-y-auto w-full h-full bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <Menu />
        {/* <Welcome /> */}
        <MessageList />
        <ChatInput />
      </main>
    </div>
  );
}
