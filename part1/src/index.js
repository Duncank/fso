import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const name = 'Desiree';
    const age = 2019 - 1991;
    return (
        <>
        <h1>Greetings</h1>
        <Hello name="Duncan" age={10 + 20} />
        <Hello name={name} age={age} />
        <Hello />
        <Footer />
        </>
    )
}

const Footer = () => {
    return (
        <div>
        greeting app created by
        <a href="https://github.com/mluukkai">mluukkai</a>
        </div>
    )
}

ReactDOM.render(< App />, document.getElementById('root'))