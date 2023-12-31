import './index.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Quest from './Quest';


export default function App() {
  const [quizzData, setQuizzData] = React.useState({})
  const [questionArr, setQuestionArr] = React.useState([])
  const [isShown, setIsShown] = React.useState(false)
  const [isCheck, setIsCheck] = React.useState(false)
  
  //base de dados
  React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=50&type=multiple")
      .then(res => res.json())
      .then(data => setQuizzData(data))
  },[])


  //gerar 5 questões
  function generateNewQuestion(i) {
      return {
          question: quizzData.results[i].question,
          correct_answer: quizzData.results[i].correct_answer,
          incorrect_answers: quizzData.results[i].incorrect_answers,
          id: nanoid()
      } 
  }
  
  function allNewQuestion() {
    const arr = []
    for (let i = 0; i < 5; i++) {
      let rand = Math.floor(Math.random() * (50))
      arr.push(generateNewQuestion(rand))
    }

    setIsCheck(false)
    setIsShown(true)
    setQuestionArr(arr)
  }

  function checkAnswers(){
    setIsCheck(true)
    console.log(questionArr.correct_answer)
  }


  //envia para Quest os valores recebidos
  const questElements = questionArr.map((question, index) =>(
    <Quest 
      index = {index}
      key ={question.id}
      question = {question.question}
      correct_answer = {question.correct_answer}
      incorrect_answers = {question.incorrect_answers}
    />
  ))

  return (
    <div className="main">
      {isShown ? 
        <div className="quest-display">
          <h1 className='title'>🤔 Superquiz 🧐</h1>
          {questElements} 
          {isCheck === false ? <button onClick={checkAnswers} className="check-btn">Check The answer</button>:
            <div>  
              <p>You scored 3/5 correct answers</p>
              <button onClick={allNewQuestion} className="play-btn">Play Again</button>
            </div>
          }
        </div>
        : 
        <div  className='intro'>
          <h1>🤔 Superquiz 🧐</h1>
          <p>Click the button to start playing!</p>
          <button onClick={allNewQuestion} className="start-btn">Start Quiz</button> 
        </div>
      }
    </div>
  );
}
