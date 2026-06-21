// @ts-nocheck
import { useState} from 'react'
import styles from './App.module.css'
import ReactPlayer from 'react-player'
import { Analytics } from '@vercel/analytics/react';
function App() {

  var [inputval, setInputVal] = useState('');
  var [showQuery, setShowQuery] = useState(true);
  var [showResults, setShowResults] = useState(false);
  var [jsonval, setJsonval] = useState({"name":" ", "desc":" ", "score":" "});
  function handleChange(e: React.FormEvent<HTMLInputElement>){
    setInputVal((e.target as HTMLInputElement).value);
  }
  function changePage(e: React.KeyboardEvent){
  
  if(e.key == 'Enter'){
    setInputVal((e.target as HTMLInputElement).value);
    console.log(inputval);
    
    fetch("https://wheatgreaser-nicheornotbackendml.hf.space/company/", {
	method: "POST",
	body: JSON.stringify({
	    "name":inputval
	}),
	headers: {
	    "Content-type": "application/json; charset=UTF-8"
	}
    })
	.then((response) => response.json())
	.then((json) => setJsonval(json));
	
	setShowQuery(false);
	setShowResults(true);
      }  
}


const Results = () => (
  <div className={styles.results}>
    <h1 className = {styles.titleresult}>most similar startup</h1>
    <h2 className = {styles.subtitle}>semantic comparison can take upto a minute, watch the subway surfers gameplay while you wait (don't switch tabs if you're on mobile please)</h2>
    <h2 className={styles.heading2}>name: {jsonval.name}</h2>
    <h2 className={styles.heading2}>description: {jsonval.desc}</h2>
    <h2 className={styles.heading2}>semantic similarity: {(jsonval.score * 100) + "%"}</h2>
    {(jsonval.name == " ") ?<div className = {styles.loader}> <div class="spinner-border" role="status" className = {styles.spinner}>
  <span class="sr-only">Loading...</span>
</div>
<ReactPlayer src='https://www.youtube.com/watch?v=QPW3XwBoQlw'  className ={styles.player}/>
</div>: null }
  </div>
)
  return (
    <>
    <Analytics/>
    {showQuery ?  <div className={styles.focus}>
    <h1 className={styles.heading}>are you niche?</h1>
    
    <input type="text" placeholder="enter your (very original) idea" className={styles.inputbox} onInput={handleChange} onKeyDown={changePage} />

  </div> : null }

	{showResults ? <Results /> : null}
      
    </>
  )

}
export default App
