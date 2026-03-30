import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text, mode } = await request.json();

    if (!text || typeof text !== "string") {
      return Response.json(
        { error: "Please provide a text string." },
        { status: 400 }
      );
    }

    if (!mode || !["classify", "summarize"].includes(mode)) {
      return Response.json(
        { error: "Mode must be 'classify' or 'summarize'." },
        { status: 400 }
      );
    }

    let systemPrompt: string;

    if (mode === "classify") {
      systemPrompt = `You are a bank transaction classifier. Classify the given transaction description into exactly ONE category from this list:
- Income
- Expense-Food
- Expense-Transport
- Expense-Utilities
- Expense-Shopping
- Expense-Entertainment
- Expense-Healthcare
- Expense-Education
- Transfer
- Investment
- EMI/Loan
- Other

Return ONLY valid JSON with no markdown or extra text.
Format: {"result":"Category Name","confidence":"high|medium|low"}`;
    } else {
      systemPrompt = `You are a text summarizer. Summarize the given text in 2-3 concise sentences that capture the key points.

Return ONLY valid JSON with no markdown or extra text.
Format: {"result":"Your 2-3 sentence summary here."}`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 200,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    const raw = response.choices[0]?.message?.content || "";

    try {
      const parsed = JSON.parse(raw);
      return Response.json(parsed);
    } catch {
      return Response.json({ result: raw });
    }
  } catch (error) {
    console.error("Demo API error:", error);
    return Response.json(
      { error: "Failed to process request. Please check API key configuration." },
      { status: 500 }
    );
  }
}
