import { NextResponse } from "next/server";
import Ollama from "ollama";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await Ollama.generate({
      model: "deepseek-r1:14b",
      prompt,
    });

    return NextResponse.json({ response: response.response });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching response" },
      { status: 500 }
    );
  }
}
