import React, { useState } from 'react';
import personService from '../services/persons'

const PersonForm = ({ onAdd, persons, onPersonUpdate }) => {
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const isPersonInPhonebook = (name) => {
        const searchval = name.toLowerCase();
        return persons.find(it => it.name.toLowerCase() === searchval);
    }

    const isNumberInPhonebook = (number) => {
        return persons.find(it => it.number === number);
    }

    const addPerson = (event) => {
        event.preventDefault();

        const person = isPersonInPhonebook(newName);
        if (person) {
            if (!isNumberInPhonebook(newNumber)) {
                const confirm = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
                if (confirm) {
                    const changedData = {...person, number: newNumber };
                    personService.update(person.id, changedData)
                        .then(response => {
                            onPersonUpdate(changedData);
                            setNewName('');
                            setNewNumber('');
                        })
                }
            }
            return false;
        }
        if (isNumberInPhonebook(newNumber)) {
            alert(`${newNumber} is already added to the phonebook`);
            return false;
        }

        const newPerson = {
            name: newName,
            number: newNumber,
        };

        onAdd(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
            </div>
            <div>
                number:
                <input
                    value={newNumber}
                    onChange={handleNumberChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;