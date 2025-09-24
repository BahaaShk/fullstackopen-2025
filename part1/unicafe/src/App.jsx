import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

const handleGood = () => {
  setGood(prev => prev + 1)
}
const handleNeutral = () => {
  setNeutral(prev => prev + 1)
}
const handleBad = () => {
  setBad(prev => prev + 1)
}

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>
      <p>good : {good}</p>
      <p>neutral :{neutral}</p>
      <p>bad : {bad}</p>
    </div>
  );
};

export default App;
