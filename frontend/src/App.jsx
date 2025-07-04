import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {





  const [name,setName]=useState('');
  const [idea,setIdea]=useState('');
  const [skill,setSkill]=useState('');



  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    if(name.trim()===''){
      alert("Give name first");
      return
    }
    if(idea.trim()===''){
      alert("Give idea");
      return;
    }
    if(skill.trim()===''){
      alert("Give skill value");
      return;
    }
    console.log(`My name is ${name} and my idea is ${idea} with skill level of ${skill}`)
    // Now making an api call
    // http://localhost:2000/

    try {
      const promise=await fetch('http://localhost:2000/getIdea',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,idea,skill})
      });
      const data=await promise.json();
      console.log(`The received data is ${data}`);

    } catch (error) {
      console.log(`Error is ${error}`);
      return;
      
    }




  }








  return (
    <>
      <h1>AI Dev Guide: Your Personalized Project Mentor</h1>
      <form action="submit" className='form'
      onSubmit={onSubmitHandler}
      
      >
        <input type="text"
        placeholder='Enter your name'
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />

        <textarea name="idea" id="Idea" placeholder='Enter your idea'
        value={idea}
        onChange={(e)=>setIdea(e.target.value)}
        
        >
        </textarea>


        <input type="text" 
        placeholder='Enter your skill level'
        value={skill}
        onChange={(e)=>setSkill(e.target.value)}
        />

        <button>Submit</button>

      </form>
    </>
  )
}

export default App
