import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Title = ({text}) => <h1>{text}</h1>
const Statistics = ({results}) => {
    if (results.total) {
        const list = Object.keys(results).map(it => (<Statistic text={it} value={results[it]} key={it} />));

        return (
            <>
                <Title text="Statistics" />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
            </>
        )
    } else {
        return (
            <>
                <Title text="Statistics" />
                No feedback given
            </>
        )
    }
}

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const totalVotes = good + neutral + bad;
    const totalPositiveVotes = good + neutral;
    const totalNegativeVotes = good - bad;
    const results = {
        good,
        neutral,
        bad,
        total: totalVotes,
        average: ((totalNegativeVotes || 0) / totalVotes) || 0,
        positivePercentage: totalVotes ? (((totalPositiveVotes || 0) / totalVotes) * 100).toString() + '%' : 0
    };

    return (
        <div>
            <Title text="Give Feedback" />
            <Button onClick={() => setGood(good + 1)} text="Good" />
            <Button onClick={() => setNeutral(neutral + 1)} text="Neutral" />
            <Button onClick={() => setBad(bad + 1)} text="Bad" />

            <br />
            <Statistics results={results} />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)