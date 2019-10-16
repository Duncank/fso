import React from 'react';

const Persons = ({ data, onRemove }) => {
    return (
        data.map(person => <Person data={person} key={person.name} onRemove={onRemove}></Person>)
    )
};

const Person = ({ data, onRemove }) => {
    const removePerson = () => {
        const confirm = window.confirm(`Delete ${data.name}?`);
        if (confirm) {
            onRemove(data.id);
        }
    }
    return (
        <li>{data.name} - {data.number} <button onClick={removePerson}>remove</button></li>
    )
};

export default Persons;