import './index.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Quest from './Quest';



export default function App() {
  const [quizzData, setQuizzData] = React.useState({})
  const [questionArr, setQuestionArr] = React.useState([])
  const [isShown, setIsShown] = React.useState(false)
  const [isCheck, setIsCheck] = React.useState(false)
  const [display, setDisplay] = React.useState("")
  var he = require('he');
  
  
  //base de dados
  React.useEffect(()=>{
      fetch("https://opentdb.com/api.php?amount=50&type=multiple")
      .then(res => res.json())
      .then(data => setQuizzData(data))
  },[])


  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0 ) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}


  //gerar 5 questões
  function generateNewQuestion(i) {
    const correct = quizzData.results[i].correct_answer;
    const incorrect = quizzData.results[i].incorrect_answers;
    const allAnswers = [...incorrect, correct]; 
    shuffle(allAnswers);
    shuffle([allAnswers])
  

    return {
        index: i,
        question: he.decode(quizzData.results[i].question),
        correct_answer: he.decode(quizzData.results[i].correct_answer),
        incorrect_answers: quizzData.results[i].incorrect_answers,
        answers: allAnswers.map(answer =>({
            answerValue: he.decode(answer),
            isHeld: false,
            isCorrect: false,
            id: nanoid()
        })),
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

 
  function holdAns(answer, QuestIndex){
    setQuestionArr(prevArr => 
      prevArr.map((question, index) =>
        index === QuestIndex
          ? {
              ...question,
              answers: question.answers.map(ans =>
                ans.id === answer.id
                  ? { ...ans, isHeld: !ans.isHeld }
                  : { ...ans, isHeld: false }
              )
            }
          : question
      )
    ); 
  }

  function checkAnswers(){
    let count = 0
    for(let i=0; i<5; i++){
      for(let j= 0; j<4; j++){
        if(questionArr[i].answers[j].answerValue === questionArr[i].correct_answer){
          document.getElementById(questionArr[i].answers[j].id).style.backgroundColor = "rgb(36, 178, 128)"
          document.getElementById(questionArr[i].answers[j].id).style.color = "rgb(20, 20, 44)"
          document.getElementById(questionArr[i].answers[j].id).style.boxShadow = "none"
          
        }
        
        if(questionArr[i].answers[j].isHeld === true){
          if(questionArr[i].answers[j].answerValue === questionArr[i].correct_answer){
            count ++
            document.getElementById(questionArr[i].answers[j].id).style.boxShadow = "inset 3px 3px 1px  rgb(0, 56, 5)"
          }else{
            document.getElementById(questionArr[i].answers[j].id).style.backgroundColor = "rgb(201, 47, 47)"
            document.getElementById(questionArr[i].answers[j].id).style.boxShadow = "inset 3px 3px 1px  rgb(58, 2, 2)"

          }
        }
      }
    }
    setIsCheck(true)
    setDisplay(`You scored ${count}/5 correct answers`)   
  }


  //envia para Quest os valores recebidos
  const questElements = questionArr.map((question, index) =>(
    <Quest 
      index={index}
      key ={question.id}
      question = {question.question}
      correct_answer = {question.correct_answer}
      answers = {question.answers}
      holdAns = {(i) => holdAns(question.answers[i], index)}
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
              <p>{display}</p>
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
