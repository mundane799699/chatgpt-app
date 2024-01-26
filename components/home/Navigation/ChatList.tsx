import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import React, { useMemo, useState } from "react";
import { PiChatBold } from "react-icons/pi";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title: "React入门实战教程",
      updateTime: Date.now(),
    },
    {
      id: "2",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "3",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "4",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "5",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "6",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "7",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "8",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "9",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "10",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "11",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "12",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "13",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "14",
      title: "如何使用Next.js创建React项目",
      updateTime: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: "15",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "16",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "17",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "18",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "19",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "20",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "21",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "22",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "23",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "24",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "25",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "26",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "27",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "28",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "29",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "30",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
    {
      id: "31",
      title: "知行小课",
      updateTime: Date.now() + 2,
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat>();
  const groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);
  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((chat) => {
                const selected = selectedChat?.id === chat.id;
                return (
                  <li
                    onClick={() => setSelectedChat(chat)}
                    key={chat.id}
                    className={`group flex items-center space-x-3 p-3 cursor-pointer rounded-md hover:bg-gray-800 ${
                      selected ? "bg-gray-800" : ""
                    }`}
                  >
                    <div>
                      <PiChatBold />
                    </div>
                    <div className="relative flex-1 whitespace-nowrap overflow-hidden">
                      {chat.title}
                      <span
                        className={`group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${
                          selected ? "from-gray-800" : "from-gray-900"
                        }`}
                      ></span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
