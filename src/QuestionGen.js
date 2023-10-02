import './index.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Quest from './Quest';

export default function QuestionGen() {
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

  /*function checkAnswers(){
    setIsCheck(true)
    console.log(questionArr.correct_answer)
  }*/

  const questElements = questionArr.map(question =>(
    <Quest 
      key ={question.id}
      question = {question.question}
      correct_answer = {question.correct_answer}
      incorrect_answers = {question.incorrect_answers}
    />
  ))

  return allNewQuestion()
}