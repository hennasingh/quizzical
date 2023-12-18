import React from 'react';
import { decode } from 'html-entities';

export default function Questions() {

    const[questions, setAllQuestions] = React.useState('')

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=05&type=multiple")
        .then((res) => res.json())
        .then((data)=> setAllQuestions(data.results))
    },[])

    const combinedOptions = (ques) => {
        let options = []
        for(let i = 0; i < ques.incorrect_answers.length; i++){
            options.push(ques.incorrect_answers[i])
        }
       const index =  Math.ceil(Math.random() * options.length)
       options.splice(index, 0, ques.correct_answer)
       return options
    }

    if (questions) {
        return(
            <div className='container'>
                 <form>
                    <div className='questions'>                  
                        {
                            questions.map((ques, idx) => (
                                <div key={idx}>
                                    <p>{ decode(ques.question) }</p>
                                    <div className="options">
                                    
                                        {
                                                combinedOptions(ques).map((label, id) => (    
                                                <div key={id}>                       
                                                    <input type="radio" id={`question_${idx}_option${id}`} name={`question${idx}`}/>
                                                    <label className="radio-button" htmlFor={`question_${idx}_option${id}`}>{decode(label)}</label>
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
