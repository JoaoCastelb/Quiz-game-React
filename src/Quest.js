import React from "react";


export default function Quest(props){
    return(
    <div className="center">
        <h2>{props.question}</h2>
        <div className="answers">
            
            {props.answers.map((answer, AnsIndex) =>(
                AnsIndex <= 3 ? 
                <p  
                    id = {answer.id}
                    key = {answer.id} 
                    onClick={() => props.holdAns(AnsIndex, props.index)} 
                    className={answer.isHeld ? "active" : "answer"} 
                >
                    {answer.answerValue}
                </p>
                :
                ""
            ))}
        </div>
    </div>
   )
}



