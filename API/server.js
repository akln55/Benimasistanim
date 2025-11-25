import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;

app.post('/ask', async (req, res) => {
  const { question } = req.body;
  if(!question) return res.status(400).json({error:'Soru eksik'});

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${OPENAI_KEY}`
      },
      body: JSON.stringify({
        model:'gpt-3.5-turbo',
        messages:[{role:'user', content:question}],
        temperature:0.7
      })
    });
    const data = await response.json();
    const msg = data.choices[0].message.content;
    res.json({answer: msg});
  } catch(e) {
    res.status(500).json({error: e.message});
  }
});

export default app;
export default app;
