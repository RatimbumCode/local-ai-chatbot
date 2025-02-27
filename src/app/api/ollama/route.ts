import { NextResponse } from 'next/server';
import Ollama from 'ollama';

export async function POST(req: Request) {
  try {
    const { messages, model } = await req.json();

    const formattedMessages = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      }),
    );

    const response = await Ollama.chat({
      model: model,
      messages: formattedMessages,
    });

    console.log(response);

    return NextResponse.json({ response: response.message.content });
  } catch (error) {
    console.error('Ollama API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch response from Ollama.' },
      { status: 500 },
    );
  }
}
