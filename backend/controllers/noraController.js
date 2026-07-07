import { askGemini } from "../services/geminiService.js";

export async function chatWithNora(req, res) {
  try {
    const { message, agent } = req.body;

    const reply = await askGemini(message, agent);

    res.json({
      success: true,
      reply,
    });
  } catch (err) {
    console.log(err.response?.data);
    console.log(err.message);
    res.status(500).json({
      success: false,
      reply: err.response?.data?.error?.message || err.message,
    });
  }
}
