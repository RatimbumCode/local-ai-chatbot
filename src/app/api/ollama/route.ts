import { NextResponse } from "next/server";
import Ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const formattedMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      })
    );

    const response = await Ollama.chat({
      model: "deepseek-r1:14b",
      messages: formattedMessages,
    });

    return NextResponse.json({ response: response.message.content });
  } catch (error) {
    console.error("Ollama API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch response from Ollama" },
      { status: 500 }
    );
  }
}
