// src/pages/HomePage.jsx
import React, { useState } from 'react';
import WeatherForm from '../components/WeatherForm';
import WeatherCard from '../components/WeatherCard';




const API_KEY = import.meta.env.VITE_API_KEY;

const HomePage = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    const fetchWeather = async (location) => {
        try {
            setError(null);
            const cacheKey=`weatherData-${location}`;
            // Retrieving data from localStorage
            const cachedData = localStorage.getItem(cacheKey);
            const parsedData = JSON.parse(cachedData); // Convert JSON string back to object
            if(cachedData){
                setWeatherData(parsedData);
                console.log("Cached Successfully");
            }
            else{
                const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch weather data');
                }
                const data = await response.json();
                localStorage.setItem(cacheKey, JSON.stringify(data));
                setWeatherData(data);
            }

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <WeatherForm onSearch={fetchWeather} />

            {weatherData && <WeatherCard weatherData={weatherData} />}
        </div>
    );
};

export default HomePage;
