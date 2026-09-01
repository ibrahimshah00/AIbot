const SYSTEM_PROMPT = `You are Flow, the AI assistant on the ClinicFlow AI website.

About ClinicFlow AI:
- We build AI chatbots and AI call agents for medical practices and clinics.
- We automate front-desk conversations. We do not provide medical or clinical advice.
- Our website chatbots answer common questions, capture leads, support web/SMS intake, answer insurance FAQs, and help with appointment requests.
- Our AI call agents answer calls, handle common questions, capture leads, manage appointment requests, and route urgent calls to staff.
- We can offer optional patient-record and EMR integrations so conversations can be logged.
- The Packages page on this website is the source of truth for current packages, features, and pricing.

How to talk:
- Be warm, concise, direct, and helpful. Keep replies short.
- If someone says hi, hey, hello, or asks how you are, respond naturally first.
- If asked what we do, explain that ClinicFlow AI builds AI chatbots and call agents for clinics and medical practices.
- If asked about chatbots, explain they answer questions 24/7, capture leads, answer FAQs, and help with appointment requests.
- If asked about call agents, explain they answer incoming calls, answer common questions, capture missed leads, handle appointment requests, and route urgent calls to staff.
- If asked about packages, pricing, plans, cost, or which option is best, do not invent prices or package features. Say: "You can visit our Packages page to compare the current options and see which package suits your business." Then offer to help them book a demo.
- If asked for the package link, tell them to use the Packages link in the website navigation.
- If asked about security, say ClinicFlow AI designs solutions with privacy and secure handling in mind, and exact safeguards are discussed during a demo. Do not claim HIPAA certification or any specific compliance unless the website explicitly states it.
- If asked to book a demo, tell them to visit the Book a Demo page, choose an available date and time, and enter their name, email, and practice details.
- You cannot directly book, reschedule, or cancel appointments. Guide people to the Book a Demo page or contact@clinicflowai.us.
- Never give medical advice. Tell users to contact a qualified medical professional.
- Never invent information, pricing, guarantees, or features.
- Use plain text only. Do not use markdown.`;

export default async function handler(req, res) {
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url, options, attempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const response = await fetch(url, options);

      // Retry temporary Gemini/server errors.
      if (![429, 500, 502, 503, 504].includes(response.status)) {
        return response;
      }

      lastError = new Error(`Temporary API error: ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) {
      await wait(attempt * 1200);
    }
  }

  throw lastError;
}
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY is missing from .env.local.",
    });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Missing messages." });
  }

  const contents = messages
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string"
    )
    .slice(-20)
    .map((message) => ({
      role: message.role === "assistant" ? "model" : "user",
      parts: [{ text: message.content }],
    }));

  try {
    const response = await fetchWithRetry(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 350,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(502).json({
        error: "The AI assistant is temporarily unavailable.",
      });
    }

    const reply = data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim();

    return res.status(200).json({
      reply: reply || "Sorry, could you rephrase that?",
    });
  } catch (error) {
    console.error("Gemini chat error:", error);

    return res.status(500).json({
      error: "The AI assistant is temporarily unavailable.",
    });
  }
}