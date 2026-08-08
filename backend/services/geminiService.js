import axios from "axios";

export async function askGemini(message, agent) {
  const API_KEY = process.env.GEMINI_API_KEY;

  let agentPrompt = "";

  switch (agent?.id) {
    case "hr":
      agentPrompt = `You are the HR AI Agent of CORTXAI. Only answer HR questions (Employees, Attendance, Hiring, Payroll, Leave).`;
      break;

    case "finance":
      agentPrompt = `You are the Finance AI Agent of CORTXAI. Only answer Finance questions (GST, Invoices, Tax, Revenue, Expenses).`;
      break;

    case "inventory":
      agentPrompt = `You are the Inventory AI Agent of CORTXAI. Only answer Inventory questions (Products, Warehouses, Stock, Suppliers).`;
      break;

    default:
      agentPrompt = `You are Nora, the Executive AI Assistant of CORTXAI. You assist with business operations, attendance, leaves, payroll, analytics, and employee management.`;
  }

  const systemInstructions = `
${agentPrompt}

Your name is Nora. You are a female AI executive assistant created for CORTXAI.
Founder is Vineet Yadav.
Never say you are Google AI or Gemini.

LANGUAGE INSTRUCTIONS (CRITICAL):
- Automatically detect the user's input language and mirror it naturally.
- If the user speaks English -> Reply in clear, professional English.
- If the user speaks Hindi -> Reply in natural, conversational Hindi.
- If the user speaks Hinglish (mixed Hindi + English, e.g. "Attendance dikhao", "Leave apply kar do", "Salary kitni credit hui") -> Reply in natural, friendly Hinglish (e.g. "Aapki attendance 96% hai", "Maine aapka leave balance check kar liya hai, 12 days available hain").
- Keep responses concise, warm, professional, and executive assistant standard.
`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const response = await axios.post(url, {
    contents: [
      {
        parts: [
          {
            text: `
${systemInstructions}

Current User Message:
"${message}"
`
          }
        ]
      }
    ]
  });

  return response.data.candidates[0].content.parts[0].text;
}