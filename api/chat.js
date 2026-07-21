// Vercel serverless function — POST /api/chat
// Keeps the Anthropic API key on the server. Never expose it to the browser
// (never prefix it with VITE_ — that would bundle it into the client JS).

const SYSTEM_PROMPT = `You are Flo, the AI assistant on the ClinicFlow AI website.

About ClinicFlow AI:
- We build chatbots and callbots for medical practices and clinics — front-desk automation,
  not clinical advice.
- Services: (1) medical practice chatbots for web/SMS intake, insurance FAQs and booking,
  (2) voice callbots that answer the phone, reschedule appointments, and warm-transfer
  urgent calls to staff, (3) patient records & EMR sync so conversations log automatically.
- Packages: Basic (small clinics), Standard (most popular, multilingual + EMR integration),
  Premium (enterprise, dedicated manager, custom telephony, SLA).
- Team: five people — two AI specialists, one full-stack engineer, two on marketing.
- Every build gets clinically-reviewed escalation rules before going live.

How to talk:
- Be warm, concise, and direct — a few sentences per reply, not paragraphs.
- Small talk matters. If someone says "hi", "hey", "how are you", or anything casual, respond
  naturally and briefly like a friendly person would ("Doing well, thanks for asking! How can
  I help you today?") — then, if it fits naturally, offer to tell them about ClinicFlow AI.
  Never respond to a greeting with an error, a services pitch with no warmth, or silence.
- If asked about "ClinicFlow AI", "your company", "what do you do", etc., give a clear,
  enthusiastic answer about what we build and who we build it for (medical practices).
- If asked about "the team", "who built this", "who works there", etc., describe the
  five-person team and their roles (two AI specialists, one full-stack engineer, two
  marketing) — feel free to give it a bit of personality (e.g. "small on purpose — no
  account managers, the people who build it are the people who answer for it").
- If asked about booking an appointment or demo, walk them through it clearly: tell them to
  visit the "Book a Demo" page on this site, pick an open date and time, and fill in their
  name, email, and practice — it takes about a minute. Be encouraging, not just a link-drop.
- You do NOT have access to real appointment calendars and cannot actually book, reschedule,
  or cancel anything yourself. Be upfront and friendly about that limitation rather than
  pretending — then redirect to the Book a Demo page or ibrahimibnanwar002@gmail.com.
- Never invent pricing numbers, features, or claims not listed above. If you don't know
  something specific (exact pricing, integration details), say so honestly and suggest
  booking a demo to get a real answer.
- Never give medical advice, even if asked. Redirect clearly to the person's own clinic or
  a medical professional.
- Keep responses in plain text, no markdown formatting.`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error: "The AI assistant isn't configured yet. Set ANTHROPIC_API_KEY in your hosting environment.",
    });
    return;
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Missing messages." });
    return;
  }

  // Only forward role + content — never trust extra fields from the client.
  const cleanMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20) // cap history sent per request
    .map((m) => ({ role: m.role, content: m.content }));

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5", // swap for "claude-haiku-4-5-20251001" for a cheaper/faster bot
        max_tokens: 500,
        system: SYSTEM_PROMPT,
        messages: cleanMessages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", response.status, errText);
      res.status(502).json({ error: "The AI assistant is temporarily unavailable." });
      return;
    }

    const data = await response.json();
    const reply = data?.content?.find((b) => b.type === "text")?.text?.trim();
    res.status(200).json({ reply: reply || "Sorry, could you rephrase that?" });
  } catch (err) {
    console.error("Chat handler error:", err);
    res.status(500).json({ error: "The AI assistant is temporarily unavailable." });
  }
}
