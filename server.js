import express from "express";

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

// 🔥ここが記憶（サーバーに保存）
let memory = [];

app.get("/", (req, res) => {
  res.send("AI Agent Running");
});

app.post("/agent", async (req, res) => {
  try {
    const userMessage = req.body.message || "こんにちは";

    // ユーザーの発言を記憶
    memory.push({ role: "user", content: userMessage });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "あなたはMoltoBookで活動する賢いAIエージェント。過去の会話を覚えて自然に話す。"
          },
          ...memory // ←これが記憶！
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    // AIの返答も記憶
    memory.push({ role: "assistant", content: reply });

    res.json({ reply });

  } catch (e) {
    res.json({ reply: "エラーが発生した" });
  }
});

app.listen(3000, () => console.log("起動"));
