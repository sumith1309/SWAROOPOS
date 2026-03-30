import OpenAI from "openai";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || typeof jobDescription !== "string" || jobDescription.trim().length < 10) {
      return Response.json(
        { error: "Please provide a valid job description (at least 10 characters)." },
        { status: 400 }
      );
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 800,
      messages: [
        {
          role: "system",
          content: `You are a professional resume tailoring assistant for S. Jyothi Swaroop. Your job is to analyze a job description and match it against Swaroop's complete profile to produce a tailored resume summary.

You must respond in EXACTLY this format with these 4 sections, using markdown headers:

## Why I'm a Fit
Write 2-3 specific sentences explaining why Swaroop is a strong match for this role. Reference concrete experience and achievements.

## Relevant Projects
List the top 5 most relevant projects from Swaroop's portfolio that align with the job requirements. For each, include the project name and a brief (1-line) explanation of why it's relevant.

## Matching Skills
List the specific skills from Swaroop's profile that match the job requirements. Group them logically (e.g., Technical, AI/Data, Product, Business).

## Talking Points
Provide 4-5 specific talking points Swaroop could use in an interview for this role. Each should reference a concrete achievement or metric.

RULES:
- Be professional, specific, and data-driven.
- Only reference real information from the knowledge base — never fabricate.
- Prioritize the most relevant and impressive matches.
- Use specific metrics and achievements where possible (e.g., "97% prediction accuracy", "20+ products shipped").

${KNOWLEDGE_BASE}`,
        },
        {
          role: "user",
          content: `Analyze this job description and create a tailored resume match for Swaroop:\n\n${jobDescription.trim()}`,
        },
      ],
    });

    const text = response.choices[0]?.message?.content || "";
    return Response.json({ response: text });
  } catch (error) {
    console.error("Resume API error:", error);
    return Response.json(
      { error: "Failed to process request. Please check API key configuration." },
      { status: 500 }
    );
  }
}
