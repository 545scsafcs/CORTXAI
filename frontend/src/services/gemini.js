export async function askGemini(message, agent) {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    const res = await fetch(`${API_BASE_URL}/nora/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  message,
  agent,
}),
      
    });

    const data = await res.json();

    return {
      reply: data.reply,
    };
  } catch (err) {
    console.error(err);

    return {
      reply: "Backend is not connected.",
    };
  }
}