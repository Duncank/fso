import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
    const [countries, setCountries] = useState([]);

    const hook = () => {
        axios.get('https://restcountries.eu/rest/v2/all ').then(response => {
            setCountries(response.data);
        })
    };
    useEffect(hook, []);

    const [filterName, setFilterName] = useState('');
    const dataToShow = filterName ? countries.filter(it => it.name.toLowerCase().includes(filterName)) : countries;

    return (
        <div>
            <Filter name={filterName} onUpdate={(val) => setFilterName(val)}></Filter>

            {/* <h2>Add new</h2>
            <PersonForm onAdd={(val) => setPersons(val)} persons={persons} /> */}

            <h2>Countries</h2>
            <Countries data={dataToShow} onSelect={(val) => setFilterName(val)}/>
    </div>
    )
}

export default App