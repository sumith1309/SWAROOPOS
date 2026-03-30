import OpenAI from "openai";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { intent } = await request.json();

    if (!intent || typeof intent !== "string") {
      return Response.json(
        { error: "Please provide an intent string." },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 400,
      messages: [
        {
          role: "system",
          content: `You are a project recommendation engine for S. Jyothi Swaroop's portfolio. Given a visitor's intent, recommend the top 3 most relevant projects from the knowledge base below.

RULES:
- Return ONLY valid JSON — no markdown, no code fences, no extra text.
- Use exact project IDs from the knowledge base: alia, sahara-sense, garmi-mitra, cognispace, bsa, nlp-classifier, trails-miles, stationeryhub, forecasting, ai-email, churn, predictive-maintenance, health, inventory, taskflow, housing, cost-estimator, healthcare-analytics, hubspot-integration, code-archaeologist
- Match visitor intent to the most relevant projects based on domain, tech stack, impact, and use case.
- Each recommendation must include a concise, compelling reason (1-2 sentences) explaining why this project is relevant to their intent.

Response format:
{"recommendations":[{"projectId":"id","name":"Project Name","reason":"Why this is relevant"},{"projectId":"id","name":"Project Name","reason":"Why this is relevant"},{"projectId":"id","name":"Project Name","reason":"Why this is relevant"}]}

${KNOWLEDGE_BASE}`,
        },
        {
          role: "user",
          content: `Visitor intent: "${intent}"`,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(text);
      return Response.json(parsed);
    } catch {
      return Response.json({
        recommendations: [],
        raw: text,
        error: "Failed to parse AI response.",
      });
    }
  } catch (error) {
    console.error("Recommend API error:", error);
    return Response.json(
      { error: "Failed to process request. Please check API key configuration." },
      { status: 500 }
    );
  }
}
