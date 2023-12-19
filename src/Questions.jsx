import React from 'react';
import { decode } from 'html-entities';

export default function Questions() {

    const[questions, setAllQuestions] = React.useState('')
    const [selectedAnswers, setSelectedAnswers] = React.useState({})

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=05&type=multiple")
        .then((res) => res.json())
        .then((data)=> {
            setAllQuestions(combineQuestions(data.results))
            console.log(data.results)})
    },[])

    function combineQuestions(questions) {
       const answers =  questions.map((ques, quesId) => {
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
                'answers': {quesId, answerId}
            }
        })
        console.log(answers)
        return answers
    }

    function handleSubmit(event) {
        event.preventDefault()
        console.log(selectedAnswers)

    }

    function handleChange(quesId, optionId) {
        setSelectedAnswers(prevAnswer => {
            return {
                ...prevAnswer,
                [quesId]: optionId
            }
        })
    }

    if (questions) {
        return(
            <div className='container'>
                 <form onSubmit={handleSubmit}>
                    <div className='questions'>                  
                        {
                            questions.map((ques, quesId) => (
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
                    <button className='check-button'>Check Answers</button>  
                 </form>               
            </div>
        )
    }
}
