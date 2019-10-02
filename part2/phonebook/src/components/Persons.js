import React from 'react';

const Persons = ({ data }) => {
    return (
        data.map(person => <Person data={person} key={person.name}></Person>)
    )
};

const Person = ({ data }) => {
    return (
        <li>{data.name} - {data.number}</li>
    )
};

export default Persons;