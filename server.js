import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Agent Running");
});

app.post("/agent", (req, res) => {
  const userMessage = req.body.message || "こんにちは";

  res.json({
    reply: "テストAI: " + userMessage
  });
});

app.listen(3000, () => console.log("起動"));
