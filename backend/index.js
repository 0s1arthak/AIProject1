import express, { response } from 'express'
import {OpenAI} from 'openai'
import dotenv from 'dotenv'
import cors from 'cors'


dotenv.config();



const app=express();


app.use(cors({
  origin: ["http://localhost:5173","https://ai-project1-green.vercel.app"], // your frontend domain
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());


const openai=new OpenAI({
    apiKey:process.env.OPEN_AI_API_KEY,
})


app.get('/',(req,res)=>{
    res.send("You are on home api route")

})

app.post('/getIdea',async(req,res)=>{
    const {name,idea,skill}=req.body;
    const prompt = `Hey AI, based on this idea: "${idea}" and the user's skill level: "${skill}", suggest how they should proceed with this project. Keep it simple.`;
    console.log(`Info getting from frontend is ${name},${idea} and ${skill}`);
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-small-3.2-24b-instruct:free',
        messages: [
          { role: 'system', content: 'You are a helpful AI project mentor.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await response.json();
    console.log("Raw data",data);
    const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, no response from AI.';
    console.log(aiResponse);
    res.json({ response: aiResponse });

  } catch (error) {
    console.error('LLM error:', error);
    res.status(500).json({ error: 'Something went wrong while talking to the LLM' });
  }
})


const port=2000;
app.listen(port,()=>console.log(`Server is listening on port ${port}`));