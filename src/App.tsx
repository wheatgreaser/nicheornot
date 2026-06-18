import { useState } from 'react'
import styles from './App.module.css'
import { useNavigate } from 'react-router-dom';

function App() {

  var [inputval, setInputVal] = useState('');
  var [showQuery, setShowQuery] = useState(true);
  var [showResults, setShowResults] = useState(false);
  var [compdesc, setCompDesc] = useState('');
  var [compname, setCompName] = useState('');
  var [compscore, setCompScore] = useState('');
  var [jsonval, setJsonval] = useState({});
  const nav = useNavigate();
  function handleChange(e){
    setInputVal(e.target.value);
  }
  function changePage(e){
  
  if(e.key == 'Enter'){
    setInputVal(e.currentTarget.value);
    console.log(inputval);
    
    fetch("http://127.0.0.1:8000/company/", {
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
    <h1 className = {styles.heading}>this is the most similar startup (it may take a few seconds to load)</h1>
    <h2 className={styles.heading}>name: {jsonval.name}</h2>
    <h2 className={styles.heading}>description: {jsonval.desc}</h2>
    <h2 className={styles.heading}>score: {jsonval.score}</h2>
    
    <h2 className={styles.heading}>the scale ranges from 0 to 1</h2>
    <h2 className={styles.heading}>a score above 0.5 should pique your interest</h2>
    

  </div>
)
  return (
    <>

    {showQuery ?  <div className={styles.focus}>
    <h1 className={styles.heading}>are you niche?</h1>
    
    <input type="text" placeholder="enter your (very original) idea" className={styles.inputbox} onInput={handleChange} onKeyDown={changePage} />

  </div> : null }

	{showResults ? <Results /> : null}
      
    </>
  )

}
export default App
