import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
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