import {useState} from 'react';
import Sentences from './Sentences';
import { compareTwoStrings } from 'string-similarity';
import './App.css';

function App() {
  const randomSentence = () => Sentences[Math.floor(Math.random() * Sentences.length)];

  const [chosen, setChosen] = useState(randomSentence());

  const [inputTime, setTime] = useState();
  const [input, setInput] = useState();
  const [accuracy, setAccuracy] = useState();
  const [ended, setEnd] = useState(false);
  const [start, setStart] = useState(false);

  const onInputChange = event => {
    const text = event.target.value;
    setInput(text);
    const isPeriod = text.charAt(text.length - 1) === '.';
    const inRange = Math.abs(text.length - chosen.length) <= 7;
    if(!start) {
      setStart(true);
      setEnd(false);
      setTime(new Date());
    } else if (isPeriod && inRange && start && !ended) { // Sentence typed
      setEnd(true);
      setTime(prev => Math.round((new Date() - prev) / 10)/100);
      setAccuracy(compareTwoStrings(text, chosen));
    }
  }

  const onButtonClick = () => {
    setStart(false);
    setEnd(false);
    setChosen(randomSentence());
    setInput('');
  }

  return (
    <div>
      <div className="Sentence">
        <p>{chosen}</p>
        <input onChange={onInputChange} value={input}/>
      </div>

      <div className="Stats">
        <p>Time: {ended && `${inputTime} seconds`}</p>
        <p>Speed: {ended && `${Math.round(input.split(' ').length / (inputTime / 60))} words per minute`}</p>
        <p>Accuracy: {ended && `${Math.round(accuracy * 10000)/100}%`}</p>

        <button className="Restart" onClick={onButtonClick}>Restart</button>
      </div>
    </div>
  );
}

export default App;
