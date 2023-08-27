import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const port = 5000 || process.env.PORT
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "This is ChatGPT AI APP",
  });
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  
});

// console.log(apiKey);

app.post("/", async (req, res) => {
  try {

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: req.body.input }],
      model: 'gpt-3.5-turbo',
      temperature: 1,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    console.log("PASSED: ", req.body.input);
    console.log(completion.choices[0].message);
    res.status(200).send({
      bot: completion.choices[0].message,
      // bot: response.data.choices[0].text
    });
  } catch (error) {
    console.log("FAILED:", req.body.input);
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(port, () => console.log("Server is running on port 4000"));
