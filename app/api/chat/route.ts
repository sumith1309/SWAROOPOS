import OpenAI from "openai";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `You are an AI assistant embedded in S. Jyothi Swaroop's portfolio website (SwaroopOS). Answer questions about Swaroop accurately and concisely using ONLY the knowledge base below. Be professional, friendly, and helpful. If asked something not covered, say you don't have that information. Keep responses brief (2-4 sentences max) unless asked for detail. Never make up facts.

${KNOWLEDGE_BASE}`,
        },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const text = response.choices[0]?.message?.content || "";
    return Response.json({ response: text });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Failed to process request. Please check API key configuration." },
      { status: 500 }
    );
  }
}
