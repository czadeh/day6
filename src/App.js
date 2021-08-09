import React, {useState, useEffect} from "react";
import axios from "axios";
import { AllHtmlEntities } from "html-entities";
import Button from "./components/Button";
import "./App.css"

const entities = new AllHtmlEntities();

const App = () => {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [correct, setCorrect] = useState(0);

  const onAnswer = (torF) => {
    if (torF  === answer) {
      setStreak(() => (streak + 1));
      setCorrect(() => (correct + 1));
    }
    else {
      setStreak(0);
    }
    setAttempts(attempts + 1);
  }

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=1&type=boolean").then((response) => {
      const result = response.data.results[0];
      setQuestion(result.question);
      setAnswer(result.correct_answer);
    });
  }, [attempts]);

  return (
    <div className="top">
      <div className="grid-rows-3">
        <div>
          {entities.decode(question)}
        </div>
        <div className = "flex-row flex justify-center pt-10">
          <Button onClick={() => onAnswer('True')}>True</Button>
          <Button onClick={() => onAnswer('False')}>False</Button>
        </div>
        <div>
          Streak: {streak} <br />
          Attemps: {attempts} <br />
          Correct Answers: {correct}
        </div>
      </div>
    </div>
  );
};

export default App;
