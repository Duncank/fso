import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Title = ({text}) => <h1>{text}</h1>
const Results = ({results}) => {
    const resultslist = Object.keys(results).map(it => (<Result name={it} value={results[it]} key={it} />));

    return (
        <>
            <Title text = "Results" />
            {resultslist}
        </>
    )
}

const Result = ({name, value}) => <li>{name}: {value}</li>

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const results = {
        good,
        neutral,
        bad,
    };

    return (
        <div>
            <Title text="Give Feedback" />
            <Button onClick={() => setGood(good + 1)} text="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button onClick={() => setBad(bad + 1)} text="Bad" />

            <br />
            <Results results={results} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)