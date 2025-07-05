import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Loader from './Loader';

function App() {





  const [name,setName]=useState('');
  const [idea,setIdea]=useState('');
  const [skill,setSkill]=useState('');

  const [loader,setLoader]=useState(false);
  const [result,setResult]=useState(null);



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

    setLoader(true);

    try {
      const promise=await fetch('http://localhost:2000/getIdea',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({name,idea,skill})
      });
      console.log(promise);
      const data=await promise.json();
      console.log(data);
      setLoader(false);
      setResult(data.response);
      

    } catch (error) {
      console.log(`Error is ${error}`);
      return;
      
    }




  }








  return (
    <>
      <h1>AI Learning Guide: Your Personalized Project Mentor</h1>


      {loader && <Loader/>}

      {!loader && result && (
        <div className='result-page'>
          <h2>Hey,{name} according to your need and your skill level, you could follow the following project guide for {idea},happy to help you and all the very best😊</h2>
          <div className="response-box">
            {result.split('\n').map((line, idx) => (
              <p key={idx} className="response-line">{line.trim()}</p>
            ))}
          </div>
          <button onClick={()=>{
            setIdea('');
            setName('');
            setSkill('');
            setResult(null)
          }}>Back</button>
        </div>

      )}


      {!loader && !result && (
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
      )}











    </>
  )
}

export default App
