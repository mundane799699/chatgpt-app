import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import { ActionType } from "@/reducers/AppReducer";
import { Message, MessageRequestBody } from "@/types/chat";
import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import { PiLightningFill, PiStopBold } from "react-icons/pi";
import TextareaAutoSize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
export default function ChatInput() {
  const [messageText, setMessageText] = useState("");
  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();
  async function send() {
    const message: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
    };
    const messages = messageList.concat([message]);
    const body: MessageRequestBody = { messages, model: currentModel };
    dispatch({ type: ActionType.ADD_MESSAGE, message });
    setMessageText("");
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      console.log(response.statusText);
      return;
    }
    if (!response.body) {
      console.log("body error");
      return;
    }
    const responseMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: responseMessage.id,
    });
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        message: { ...responseMessage, content },
      });
    }
    dispatch({
      type: ActionType.UPDATE,
      field: "streamingId",
      value: "",
    });
    setMessageText("");
  }
  return (
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          (streamingId !== "" ? (
            <Button icon={PiStopBold} variant="primary" className="font-medium">
              停止生成
            </Button>
          ) : (
            <Button icon={MdRefresh} variant="primary" className="font-medium">
              重新生成
            </Button>
          ))}
        <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.10)] py-4">
          <div className="mx-3 mb-2.5">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white outline-none resize-none border-0"
            placeholder="输入一条消息..."
            rows={1}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Button
            className="mx-3 !rounded-lg"
            icon={FiSend}
            disabled={messageText.trim() === "" || streamingId !== ""}
            variant="primary"
            onClick={send}
          />
        </div>
      </div>
      <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
        ©{new Date().getFullYear()}&nbsp;{" "}
        <a
          className="font-medium py-[1px] border-b border-dotted border-black/60 hover:border-black/0 dark:border-gray-200 dark:hover:border-gray-200/0 animated-underline"
          href="https://x.zhixing.co"
          target="_blank"
        >
          知行小课
        </a>
        .&nbsp;基于第三方提供的接口
      </footer>
    </div>
  );
}
