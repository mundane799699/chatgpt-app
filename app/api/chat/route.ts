import { sleep } from "@/common/util";
import client from "@/lib/openai";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { messages, model } = (await request.json()) as MessageRequestBody;
  const newMessages = messages.map((message) => {
    return {
      role: message.role,
      content: message.content,
    };
  });
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const events = await client.streamChatCompletions(
        model,
        [
          {
            role: "system",
            content:
              "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
          },
          ...newMessages,
        ],
        {
          maxTokens: 1024,
        }
      );
      for await (const event of events) {
        for (const choice of event.choices) {
          const delta = choice.delta?.content;
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }
      }
      controller.close();
    },
  });
  return new Response(stream);
}
