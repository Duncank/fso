import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const MostVotes = ({ index, votes }) => {
    if (index === -1) {
        return (
            <div>
                <h1>Anecdote with the most votes</h1>
                No votes
            </div>
        )
    } else {
        return (
            <div>
                <h1>Anecdote with the most votes</h1>
                {anecdotes[index]}<br />
                has {votes} votes
            </div>
        )
    }
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    const setRandomAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    const voteForAnecdote = () => {
        const copy = [...votes]
        copy[selected] += 1;
        setVotes(copy)
    }

    const mostVotesAmount = votes.reduce((acc, cur) => Math.max(acc, cur));
    const mostVotesAnecdote = mostVotesAmount > 0 ? votes.indexOf(mostVotesAmount) : -1;

    return (
        <div>
            {props.anecdotes[selected]}<br />
            has {votes[selected]} votes<br />
            <Button text="Vote" onClick={voteForAnecdote} />
            <Button text="Next one" onClick={setRandomAnecdote} />

            <MostVotes index={mostVotesAnecdote} votes={mostVotesAmount} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)