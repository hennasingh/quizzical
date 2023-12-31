import React from 'react';
import { decode } from 'html-entities';
import yellowIcon from './blobQY.png'
import blueIcon from './blobQB.png'

export default function Questions() {

    const[allQuestions, setAllQuestions] = React.useState([])
    const [selectedAnswers, setSelectedAnswers] = React.useState({})
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [playAgain, setPlayAgain] = React.useState(false)

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=05&type=multiple")
        .then((res) => res.json())
        .then((data)=> {
            setAllQuestions(combineQuestions(data.results))
        })
    },[playAgain])

    function combineQuestions(fetchedQuestions) {
       const answers =  fetchedQuestions.map((ques, quesId) => {
            let options = []
            for(let i = 0; i < ques.incorrect_answers.length; i++){
                options.push(ques.incorrect_answers[i])
            }
           const answerId =  Math.ceil(Math.random() * options.length)
           options.splice(answerId, 0, ques.correct_answer)
            return {
                'id': quesId ,
                'question': ques.question,
                options,
                'answerIndex': answerId
            }
        })
        return answers
    }

    function handleSubmit(event) {
        event.preventDefault()

        allQuestions.forEach((ques, index) => {
            const radiosName = document.getElementsByName('ques_' + index)
        
            radiosName.forEach((radiosValue) => {
                if(radiosValue.checked){
                    if(radiosValue.value == ques.answerIndex) {
                        setCorrectAnswers(prevAnswer => prevAnswer + 1)
                        radiosValue.nextSibling.style.backgroundColor = "#94D7A2"
                        radiosValue.nextSibling.style.border = "none"
                    } else {
                        radiosValue.nextSibling.style.backgroundColor = "#F8BCBC"
                        radiosValue.nextSibling.style.color="#293264"
                        radiosValue.nextSibling.style.border = "none"
                        radiosValue.nextSibling.style.opacity = "0.7"
                    }
                } else if(radiosValue.value == ques.answerIndex) {
                    radiosValue.nextSibling.style.backgroundColor = "#94D7A2"
                    radiosValue.nextSibling.style.border = "none"
                } else {
                    radiosValue.nextSibling.style.opacity = "0.7"
                }
            })
        })
        setGameOver(true)
    }

    function handleChange(quesId, optionId) {
        setSelectedAnswers(prevAnswer => {
            return {
                ...prevAnswer,
                [quesId]: optionId
            }
        })
    }

    function resetGame() {
        setGameOver(false)
        setSelectedAnswers({})
        setCorrectAnswers(0)
        setPlayAgain(true)
        setAllQuestions([])

    }

    if (allQuestions) {
        return(
            <div className='container'>
                <img src={yellowIcon} className='yellow-blob yellow'/>
                 <form onSubmit={handleSubmit}>
                    <div className='questions'>                  
                        {
                            allQuestions.map((ques, quesId) => (
                                <div key={quesId}>
                                    <p>{ decode(ques.question) }</p>
                                    <div className="options">
                                    
                                        {                                           

                                            ques.options.map((label, optionId) => (    
                                                <div key={optionId}>                      
                                                    <input 
                                                        type="radio" 
                                                        id={`ques_${quesId}_option${optionId}`} 
                                                        name={`ques_${quesId}`}
                                                        value={optionId}
                                                        checked ={selectedAnswers[quesId] === optionId}
                                                        onChange = {() => handleChange(quesId, optionId)}
                                                    />
                                                    <label
                                                        className="radio-button" 
                                                        htmlFor={`ques_${quesId}_option${optionId}`}
                                                    > 
                                                    {decode(label)}
                                                    </label>
                                                </div>
                                            ))
                                        }                                       
                                    </div>
                                    <hr />
                                </div>
                                ))
                        }
                    </div>
                   { !gameOver && <button className='control-button'>Check Answers</button>  }
                 </form>
                 {gameOver && 
                    <div className="play-again">
                        <p className="correct-answers">You scored {correctAnswers}/{allQuestions.length} correctAnswers</p>
                        <button className='control-button play' onClick={resetGame}>Play again</button>  
                     </div>
                 }
                 <img src={blueIcon} className='blue-blob blue'/>

            </div>
        )
    }
}
