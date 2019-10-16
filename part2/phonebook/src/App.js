import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'

const App = () => {
    const [persons, setPersons] = useState([]);

    const hook = () => {
        personService.getAll().then(persons => {
            setPersons(persons);
        })
    };
    useEffect(hook, []);

    const onRemove = (id) => {
        personService.remove(id).then(res => {
            setPersons(persons.filter(it => it.id !== id));
        })
    }

    const onPersonUpdate = (person) => {
        setPersons(persons.map(it => it.id === person.id ? person : it));
    }

    const [filterName, setFilterName] = useState('');
    const peopleToShow = filterName ? persons.filter(it => it.name.toLowerCase().includes(filterName)) : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter name={filterName} onUpdate={(val) => setFilterName(val)}></Filter>

            <h2>Add new</h2>
            <PersonForm onAdd={(val) => setPersons(val)} persons={persons} onPersonUpdate={onPersonUpdate} />

            <h2>Numbers</h2>

            <Persons data={peopleToShow} onRemove={onRemove} />
    </div>
    )
}

export default App