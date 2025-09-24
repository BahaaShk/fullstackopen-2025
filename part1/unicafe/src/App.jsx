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
  positive,
}) => {
  if (total === 0) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>give feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><button onClick={handleGood}>good</button></td>
              <td><button onClick={handleNeutral}>neutral</button></td>
              <td><button onClick={handleBad}>bad</button></td>
            </tr>
            <tr>
              <th colSpan={3}>statistics</th>
            </tr>
            <tr>
              <td colSpan={3}>no feedback given</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>give feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><Button onClick={handleGood} value={'good'} /></td>
              <td><Button onClick={handleNeutral} value={'neutral'} /></td>
              <td><Button onClick={handleBad} value={'bad'} /></td>
            </tr>
            <tr>
              <th colSpan={3}>statistics</th>
            </tr>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive + " %"} />
          </tbody>
        </table>
      </div>
    );
};

const Button = ({ onClick, value }) => (
  <button onClick={onClick}>{value}</button>
);

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood((prev) => prev + 1);
  const handleNeutral = () => setNeutral((prev) => prev + 1);
  const handleBad = () => setBad((prev) => prev + 1);

  const total = good + bad + neutral;
  const average = total === 0 ? 0 : ((good * 1 + neutral * 0 + bad * -1) / total).toFixed(2);
  const positive = total === 0 ? 0 : ((good / total) * 100).toFixed(1);

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