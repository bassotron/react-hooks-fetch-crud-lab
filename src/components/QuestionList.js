import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  
  // GET request on page load. useState for the GET request from the API
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data))
    }, []) 

    const deleteQuestionFromList = (id) => {
      const idQuestion = questions.findIndex(q => q.id === id)
      
      const newQuestionList = [...questions]
      newQuestionList.splice(idQuestion.id)
      
      
      
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
               
      })
      
     
    }

    const handleUpdate = (id, correct) => {
      console.log(id)
      console.log(correct)
  
      fetch(`http://localhost:4000/questions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          'correctIndex': correct
        })})
        .then(resp => resp.json())
        .then(console.log)
  
        setQuestions(questions)
    }
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(q => <QuestionItem key={q.id} question={q} handleDelete={deleteQuestionFromList} handleUpdate={handleUpdate} />)} </ul>
    </section>
  );
}

export default QuestionList;
