import { useState } from 'react'
import styles from './App.module.css'
import { useNavigate } from 'react-router-dom';

function App() {

  var [inputval, setInputVal] = useState('');
  const nav = useNavigate();
  return (
    <>
    
      <div className={styles.focus}>
        <h1 className={styles.heading}>are you niche?</h1>
        
        <input type="text" placeholder="enter your (very original) idea" className={styles.inputbox} onKeyDown={changePage} />
      </div>
      
    </>
  )
  function changePage(e){
  
  if(e.key == 'Enter'){
    setInputVal(e.currentTarget.value);
    console.log(inputval);
    nav('/results')
    

  }  
  

}
}

export default App
