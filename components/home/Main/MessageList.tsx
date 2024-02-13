import { useAppContext } from "@/components/AppContext";
import Markdown from "@/components/common/Markdown";
import React from "react";
import { SiOpenai } from "react-icons/si";

export default function MessageList() {
  const {
    state: { messageList, streamingId },
  } = useAppContext();
  return (
    <div className="w-full pt-10 pb-48 dark:text-gray-300">
      <ul>
        {messageList.map((message) => {
          const isUser = message.role === "user";
          return (
            <li
              key={message.id}
              className={`${
                isUser
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
            >
              <div className="w-full max-w-4xl mx-auto flex space-x-6 px-4 py-6 text-lg">
                <div className="text-3xl leading-[1]">
                  {isUser ? "😊" : <SiOpenai />}
                </div>
                <div className="flex-1">
                  <Markdown>{`${message.content}${
                    message.id === streamingId ? "▍" : ""
                  }`}</Markdown>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
