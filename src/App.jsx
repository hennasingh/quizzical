import './App.css'
import React from 'react'
import Questions from './Questions'
import yellowIcon from './yellow-blob.png'
import blueIcon from './blue-blob.png'

function App() {
 
  const[startScreen, setScreen] = React.useState(true)

  function handleClick() {
    setScreen(prevState => !prevState)
  }

  if(startScreen) {

    return (
      <>
        <img src={yellowIcon} class='yellow-blob'/>
        <h1 className='quiz-title'>Quizzical</h1>
        <p>A fun quiz from multiple categories. 
        <br/>Let's see how much time you take to solve.</p>
        <button className='start-quiz' onClick={handleClick}>Start Quiz</button>
        <img src={blueIcon} class='blue-blob'/>
      </>
    )
  }
  else {
     return(
      <Questions />
     )
  }
}

export default App
