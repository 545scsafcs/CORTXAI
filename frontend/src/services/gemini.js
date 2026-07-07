export async function askGemini(message, agent) {
  try {
    const res = await fetch("https://cortxai-backend.onrender.com/api/nora/chat", {
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