import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filterName, setFilterName] = useState('');

    const peopleToShow = filterName ? persons.filter(it => it.name.toLowerCase().includes(filterName)) : persons;

    const rows = () => peopleToShow.map(person =><li>{person.name} - {person.number}</li>);

    const isPersonInPhonebook = (name) => {
        const searchval = name.toLowerCase();
        return persons.find(it => it.name.toLowerCase() === searchval);
    }

    const isNumberInPhonebook = (number) => {
        return persons.find(it => it.number === number);
    }

    const addPerson = (event) => {
        event.preventDefault();

        if (isPersonInPhonebook(newName)) {
            alert(`${newName} is already added to the phonebook`);
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

        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterNameChange = (event) => {
        setFilterName(event.target.value.toLowerCase());
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with
                <input
                    value={filterName}
                    onChange={handleFilterNameChange}
                />
            </div>

            <h2>Add new</h2>
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
            <h2>Numbers</h2>
            {rows()}
    </div>
    )
}

export default App