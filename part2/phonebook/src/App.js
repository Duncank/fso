import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons'
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [notification, setNotification] = useState({ type: null, message: null })

    const hook = () => {
        personService.getAll().then(persons => {
            setPersons(persons);
        })
    };
    useEffect(hook, []);

    const onRemove = (id) => {
        const person = persons.filter(it => it.id);
        personService.remove(id)
            .then(res => {
                setPersons(persons.filter(it => it.id !== id));
            })
            .catch(res => {
                setNotification({
                    type: 'error',
                    message: `Information of ${person.name} has already been removed from the server`
                });
            });
    }

    const onPersonUpdate = (person) => {
        setPersons(persons.map(it => it.id === person.id ? person : it));
    }

    const onAdd = (newPerson) => {
        personService.create(newPerson).then(returnedObject => {
            setPersons(persons.concat(returnedObject));

            setNotification({ type: 'success', message: `Added ${newPerson.name}` });
            setTimeout(() => { setNotification({ type: null, message: null }) }, 2000);
        });

    }

    const [filterName, setFilterName] = useState('');
    const peopleToShow = filterName ? persons.filter(it => it.name.toLowerCase().includes(filterName)) : persons;

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification type={notification.type} message={notification.message} />

            <Filter name={filterName} onUpdate={(val) => setFilterName(val)}></Filter>

            <h2>Add new</h2>
            <PersonForm onAdd={onAdd} persons={persons} onPersonUpdate={onPersonUpdate} />

            <h2>Numbers</h2>

            <Persons data={peopleToShow} onRemove={onRemove} />
    </div>
    )
}

export default App