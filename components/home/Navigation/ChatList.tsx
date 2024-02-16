import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import React, { useEffect, useMemo, useState } from "react";
import { PiChatBold } from "react-icons/pi";
import ChatItem from "./ChatItem";
import { useEventBusContext } from "@/components/EventBusContext";

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
  const { subscribe, unsubscribe } = useEventBusContext();
  useEffect(() => {
    const callback: EventListener = () => {
      console.log("fetchChatList");
    };
    subscribe("fetchChatList", callback);
    return () => {
      unsubscribe("fetchChatList", callback);
    };
  }, []);
  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((item) => {
                const selected = selectedChat?.id === item.id;
                return (
                  <ChatItem
                    key={item.id}
                    item={item}
                    selected={selected}
                    onSelected={setSelectedChat}
                  />
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
