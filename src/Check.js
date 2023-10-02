import './index.css';
import React from 'react';
import { nanoid } from 'nanoid';
import Quest from './Quest';
import App from './App';

<Quest 
      key ={question.id}
      question = {question.question}
      correct_answer = {question.correct_answer}
      incorrect_answers = {question.incorrect_answers}
/>