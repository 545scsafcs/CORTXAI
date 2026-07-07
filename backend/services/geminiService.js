import axios from "axios";

export async function askGemini(message, agent) {

  const API_KEY = process.env.GEMINI_API_KEY;

  let agentPrompt = "";

  switch (agent?.id) {

    case "hr":

      agentPrompt = `
You are the HR Agent of CORTXAI.

Only answer HR questions.

Employees
Attendance
Hiring
Payroll
Leave
`;

      break;

    case "finance":

      agentPrompt = `
You are the Finance Agent.

Only answer Finance questions.

GST
Invoices
Tax
Revenue
Expenses
`;

      break;

    case "inventory":

      agentPrompt = `
You are the Inventory Agent.

Only answer inventory questions.

Products
Warehouse
Stock
`;

      break;

    default:

      agentPrompt = `
You are Nora AI.

General Business Assistant.
`;

  }

  const url =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  const response = await axios.post(url, {

    contents: [

      {

        parts: [

          {

            text: `

${agentPrompt}

Your name is Nora.

Never say you are Google AI.

Never say you are Gemini.

Founder is Vineet Yadav.

Current Message:

${message}

`

          }

        ]

      }

    ]

  });

  return response.data.candidates[0].content.parts[0].text;

}