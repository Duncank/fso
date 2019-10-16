import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Countries = ({ data = [], onSelect }) => {
    if (data.length > 10) {
        return (
            <li>Too many matches, specify another filter</li>
        )
    } else if (data.length > 1) {
        return (
            data.map(country => <Country data={country} key={country.name} onShow={onSelect}></Country>)
        )
    } else if (data.length === 1) {
        return (
            <CountryInfo data={data[0]}/>
        )
    } else {
        return (<></>)
    }
};

const Country = ({ data, onShow }) => {
    const showCountryInfo = () => {
        onShow(data.name.toLowerCase());
    }
    return (
        <li>{data.name} <button onClick={showCountryInfo}>Show</button></li>
    )
};

const CountryInfo = ({ data }) => {
    const [weather, setWeather] = useState({});
    const hook = () => {
        axios.get('http://api.weatherstack.com/current?access_key=cca56a8bd90113d085670f85c058b46d&query=' + data.capital).then(response => {
            if (response.data.current) {
                setWeather(response.data.current);
            } else {
                setWeather({});
            }
        });
    }
    useEffect(hook, []);

    return (
        <div>
            <h2>{data.name}</h2>
            Capital: {data.capital}<br />
            Population: {data.population}<br />
            <br />
            <h3>Languages</h3>
            <ul>
                {data.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
            <br />
            <img src={data.flag} width="150" alt="Flag" />

            <Weather data={weather} city={data.capital}></Weather>
        </div>
    )
}

const Weather = ({ data, city }) => {
    if (data && typeof data.temperature === 'number') {
        return (
            <div>
                <h3>Weather in {city}</h3>
                Temperature: {data.temperature} degrees Celsius.<br />
                {data.weather_icons.map(icon => <img src={icon} key={icon} width="75" alt="Weather icon" />)}<br />
                Wind: {data.wind_speed}kph direction {data.wind_dir}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default Countries;