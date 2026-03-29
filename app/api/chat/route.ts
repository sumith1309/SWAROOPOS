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
          content: `You are an AI assistant embedded in S. Jyothi Swaroop's portfolio website (SwaroopOS). You have two modes:

1. SWAROOP QUESTIONS: For anything about Swaroop (projects, skills, career, education, contact, etc.), answer accurately using the knowledge base below. Be professional, friendly, and specific.

2. GENERIC QUESTIONS: For general knowledge questions (tech concepts, coding help, industry trends, etc.), answer briefly and helpfully in 1-2 sentences. You can answer these from your general knowledge — you don't need to relate everything back to Swaroop.

RULES:
- Keep ALL responses concise — 2-4 sentences max unless the user asks for detail.
- Never make up facts about Swaroop. Use only the knowledge base for Swaroop-related answers.
- Be conversational, warm, and professional.
- If someone asks "who built this" or "whose portfolio is this", answer about Swaroop.
- You can suggest the user download Swaroop's CV from the portfolio for a complete overview.

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
