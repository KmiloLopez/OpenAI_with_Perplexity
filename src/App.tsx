import {aiRequest} from './components/ai-request'

import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [enteredtext, setEnteredtext] = useState("");
  const [indexCount, setIndexCount] = useState(0);
  const [answerText, setAnswerText] = useState("");
  const [saveWord, setSaveWord] = useState(true);
  const [compareWord, setCompareWord] = useState("");
  const [reset, setReset] = useState(false);
  const [showInputBox, setShowInputBox] = useState(true)
  const [showAskAgain, setShowAskAgain] = useState(false)
  const [showAIanswer, setShowAIanswer] = useState(false)
  const [AskAgainClass, setAskAgainClass] = useState('answer-button ')

  const [aiAnswer, setAiAnswer] = useState('')
  const [boxClass, setBoxClass] = useState('response-box')

  const hiddenword = "Como se llama";


  const handleSubmit = async(e:any) => {
    e.preventDefault();
    setShowInputBox(false);
    console.log("Submit");
    console.log(enteredtext, answerText);
    const requestAI = enteredtext+' '+answerText;
    console.log(requestAI);
    const aiResponse = await aiRequest(requestAI);
    if (aiResponse){
      console.log('esto es aiResponse:',aiResponse);
      setShowAskAgain(true);
      setShowAIanswer(true);
      setAiAnswer(aiResponse);
      setBoxClass('response-box visible');
      // setAskAgainClass('answer-button visible')
      setTimeout(() => setAskAgainClass('answer-button visible'),5000)
      


    }
    setEnteredtext("");
    setIndexCount(0);
    setAnswerText("");
    setSaveWord(true);
  };

  const handleOnClick = () => {
    setShowAskAgain(false);
    setShowAIanswer(false);
    setAiAnswer('');
    setShowInputBox(true);
    setBoxClass('response-box');
    setAskAgainClass('answer-button Preguntar-bottom')
  }
  const handleOnChange = (e:any) => {
    //comparo la entrada anterior con la nueva para identificar si se ha ingresado la opcion de borrar para borrar el texto
    setCompareWord(e.slice(0, -1));
    if (compareWord === e && hiddenword.length > indexCount) {
      console.log("es un del");
      setReset(true);
    }
    if (hiddenword.length > indexCount) {
      if (saveWord) {
        //saving word...
        setAnswerText(answerText + e.slice(-1));
      }

      const array = hiddenword.split("");
    

      setEnteredtext([...enteredtext, ...array[indexCount]].join(""));
      setIndexCount((indexCount) => indexCount + 1);
    } else {
      //setEnteredtext([...enteredtext, ...e].join(""));
      setEnteredtext(e);
    }
  };
  useEffect(() => {
    if (answerText.includes("  ")) {
      if (hiddenword.length > indexCount) {
        setSaveWord(false);
      }

      console.log("saved secret answer");
    } else {
      console.log("adding secret answer");
    }
  }, [answerText]);
  useEffect(() => {
    setEnteredtext("");
    setIndexCount(0);
    setAnswerText("");
    setSaveWord(true);
    setReset(false);
  }, [reset]);
  return (
    <>
     {showInputBox&& <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={enteredtext}
            onChange={(e) => handleOnChange(e.target.value)}
          ></input>
          <button className='Preguntar-top'>Preguntar</button>
        </form>
      </div>}
     
      { <p className={boxClass}>{aiAnswer}</p>}
      {<button className={AskAgainClass}  onClick={handleOnClick}>Preguntar</button>}
    </>
  );
}

export default App;
