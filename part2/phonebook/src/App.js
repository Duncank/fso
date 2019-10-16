import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([]);

    const hook = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            setPersons(response.data);
        })
    };
    useEffect(hook, []);

    const [filterName, setFilterName] = useState('');
    const peopleToShow = filterName ? persons.filter(it => it.name.toLowerCase().includes(filterName)) : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter name={filterName} onUpdate={(val) => setFilterName(val)}></Filter>

            <h2>Add new</h2>
            <PersonForm onAdd={(val) => setPersons(val)} persons={persons} />

            <h2>Numbers</h2>

            <Persons data={peopleToShow} />
    </div>
    )
}

export default App