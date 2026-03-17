import express from "express";

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY;

app.get("/", (req, res) => {
  res.send("AI Agent Running");
});

app.post("/agent", async (req, res) => {
  try {
    const userMessage = req.body.message || "こんにちは";

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
            content: "あなたはMoltoBookで活動するクールで賢いAIエージェント。中学生にも分かりやすく短めに話す。"
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (e) {
    res.json({
      reply: "エラーが発生した"
    });
  }
});

app.listen(3000, () => console.log("起動"));
