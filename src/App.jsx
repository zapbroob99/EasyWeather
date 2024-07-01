import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './pages/HomePage.jsx';

const App = () => {
    return (
        <div>

            <h1>🌦EasyWeather</h1>
            <HomePage />
        </div>
    );
};

export default App
