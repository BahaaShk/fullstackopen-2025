import { useState } from "react";

const Statistics = ({
  handleBad,
  handleGood,
  handleNeutral,
  good,
  bad,
  neutral,
  total,
  average,
  positive
}) => {
  if (total === 0) {
    return (
      <>
        <h2>give feedback</h2>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
        <h2>statistics</h2>
        <p>no feedback given</p>
      </>
    );
  } else
    return (
      <>
        <h2>give feedback</h2>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
        <h2>statistics</h2>
   <StatisticLine value={good} text={"good"}/>
   <StatisticLine value={neutral} text={"neutral"}/>
   <StatisticLine value={bad} text={"bad"}/>
   <StatisticLine value={average} text={"average"}/>
   <StatisticLine value={positive} text={"positive"}/>
      </>
    );
};

const StatisticLine = ({text, value}) => {

  return (
<>
    <p>{text} {value}</p>
        {/* <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {total === 0 ? 0 : average / total}</p>
        <p>positive {total === 0 ? 0 : (good / total) * 100} %</p> */}
      </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood((prev) => prev + 1);
  };
  const handleNeutral = () => {
    setNeutral((prev) => prev + 1);
  };
  const handleBad = () => {
    setBad((prev) => prev + 1);
  };

  const total = good + bad + neutral;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / total) *100

  return (
    <div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
    </div>
  );
};

export default App;
