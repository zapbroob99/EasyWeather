import React, { useState, useEffect, useRef } from 'react';

const WeatherForm = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus on the input field when the component mounts
        inputRef.current.focus();
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(location);
    };
    const handleButtonClick = () => {
        inputRef.current.focus();
    };
    return (
        <form onSubmit={handleSubmit} onClick={handleButtonClick}>
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Select Location"
                ref={inputRef}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default WeatherForm;
