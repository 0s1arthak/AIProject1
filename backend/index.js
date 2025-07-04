import express from 'express'
import {OpenAI} from 'openai'
import dotenv from 'dotenv'

dotenv.config();



const app=express();

app.use(express.json());


const openai=new OpenAI({
    apiKey:process.env.OPEN_AI_API_KEY,
})


app.get('/',(req,res)=>{
    res.send("You are on home api route")

})

app.post('/getIdea',(req,res)=>{
    const {name,idea,skill}=req.body;
})


const port=2000;
app.listen(port,()=>console.log(`Server is listening on port ${port}`));