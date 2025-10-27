import React, {useState} from 'react'


export default function Flascard({question, answear, number, userLanguage, correct}) {


  const [back, setBack] = useState("")
  const [select, setSelect] = useState({
    A: false,
    B: false,
    C: false
  })
  const [explanaition, setExplanaition] = useState("")
  const [error, setError] = useState("")

  let resultStringQuestion = "";

  const handleAnswear = async () => {

    try {

      setBack(true)
      if(explanaition) return 

      if(select.A === false && select.B === false && select.C === false)
      {
        setError("You need to select an aswear")
        return
      }
        

      let selectedAnswear = ""

      if(select.A)
        selectedAnswear = resultStringAnswear
      else if(select.B) 
        selectedAnswear = resultStringAnswear2
      else if(select.C) 
        selectedAnswear = resultStringAnswear3

      const resp = await fetch("https://api.skillify-ai.com/chatgpt/explanation", {
        credentials: "include",
          method: "POST",
        body: JSON.stringify({
          question: resultStringQuestion,
          correct: resultStringCorrect,
          answear: selectedAnswear,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
  
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {

          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        
        setExplanaition(prevState => prevState + chunk)
        return processStream();
      };
  
      processStream();
        
      } catch (err) {
       
        console.log(err);
    }
}

  const handleGoBack = () => setBack(false)

  if(question)
  {
    const colonIndexQuestion = question.indexOf(":");

    
    if (colonIndexQuestion !== -1) {
      resultStringQuestion = question.slice(colonIndexQuestion + 1).trim();
    } else {
      resultStringQuestion = question;
    }
  }
  
  let resultStringAnswear = "";
  let resultStringAnswear2 = "";
  let resultStringAnswear3 = "";
  if(answear[0] && answear[1] && answear[2])
  {
    const colonIndexAnswear = answear[0].indexOf(":");

    if (colonIndexAnswear !== -1) {
      resultStringAnswear = answear[0].slice(colonIndexAnswear + 1).trim();
      resultStringAnswear2 = answear[1].slice(colonIndexAnswear + 1).trim();
      resultStringAnswear3 = answear[2].slice(colonIndexAnswear + 1).trim();
    } else {
      resultStringAnswear = answear[0];
      resultStringAnswear2 = answear[1];
      resultStringAnswear3 = answear[2];

    }
  }
  let resultStringCorrect = ""
  if(correct) 
  {
    const colonIndexCorrect = correct.indexOf(":");
    if (colonIndexCorrect !== -1) {
      resultStringCorrect = correct.slice(colonIndexCorrect + 1).trim();
    } else {
      resultStringCorrect = correct;
    }
  }
  const selectAnswear = (type) => {

    setSelect(() => ({
      A: false,
      B: false,
      C: false,
      [type]: true
    }))
  } 

  return (
    <div className='flashcard-container'>
      <div className='main-container flashcard'>
          <div className={`flip-card-lesson ${back ? 'flip-card-lesson-back' : ""}`}>
              <div className='front-card'>
                <div className='card-content'>
                  <div>
                  <h1>Question {number}:</h1>
                    <p>{resultStringQuestion}</p>
                  </div>
                {resultStringAnswear && resultStringAnswear2 && resultStringAnswear3 && <div className='answear-container'>
                    <div onClick = {() => selectAnswear("A")} className={`multiple-answear ${select.A ? "answear-active" : ""}`}>
                      <div className='letter'>
                        <h1>A</h1>
                      </div>
                      <div className='answear-content'>
                        <p>{resultStringAnswear}</p>
                      </div>
                    </div>
                    
                    <div onClick = {() => selectAnswear("B")} className={`multiple-answear ${select.B ? "answear-active" : ""}`}>
                      <div className='letter'>
                        <h1>B</h1>
                      </div>
                      <div className='answear-content'>
                        <p>{resultStringAnswear2}</p>
                      </div>
                    </div>
                    <div onClick = {() => selectAnswear("C")} className={`multiple-answear ${select.C ? "answear-active" : ""}`}>
                      <div className='letter'>
                        <h1>C</h1>
                      </div>
                      <div className='answear-content'>
                        <p>{resultStringAnswear3}</p>
                      </div>
                    </div>
                  </div>}
                  <div style={{width: '50%'}}>
                    <button className='generate-button' onClick={handleAnswear}>Submit</button>
                    {error && <span className='error'>{error}</span>}
                  </div>
                </div>
              </div>
              <div className='back-card'>
                <div className='card-content'>
                  <h1>Answear {number}:</h1>
                  <div>
                    <p>You answered: {select.A === true ? 'A' : ""} {select.B === true ? 'B': ""} {select.C === true ? "C" : ""} Correct answear is: {resultStringAnswear === resultStringCorrect ? "A" : resultStringAnswear2 === resultStringCorrect ? "B" : resultStringAnswear3 === resultStringCorrect ? "C" : ""}</p>
                    <p>Explanation: {explanaition} </p>
                  </div>
                  <button className='generate-button' onClick={handleGoBack}>Go back</button>
                  
                </div>
              </div>
          </div>
      </div>
    </div>

  )
}
