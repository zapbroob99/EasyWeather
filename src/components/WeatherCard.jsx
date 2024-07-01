import React from 'react';

const WeatherCard = ({ weatherData }) => {
    const { resolvedAddress, description, days, currentConditions, alerts } = weatherData;

    const toCelsius = (fahrenheit) => {
        return ((fahrenheit - 32) * 5 / 9).toFixed(1);
    };

    const getDayName = (datetime) => {
        const date = new Date(datetime);
        const options = { weekday: 'long' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const weatherEmojis = {
        'Clear': '☀️',
        'Partly Cloudy': '⛅',
        'Cloudy': '☁️',
        'Rain': '🌧️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Fog': '🌫️',
        'Partially cloudy':'⛅',
    };

    const getWeatherEmoji = (conditions) => {
        return weatherEmojis[conditions] || '';
    };

    const formatDate = (date) => {
        const options = { month: 'numeric', day: 'numeric' };
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };

    const weeks = groupDaysByWeeks(days);

    return (
        <div className="weather-card">
            <h2>Weather for {resolvedAddress}</h2>
            <p>{description}</p>

            {currentConditions && (
                <div className="current-conditions">
                    <h3>Current Conditions</h3>
                    <p><b>{toCelsius(currentConditions.temp)} °C</b></p>
                    <p>Feels Like: {toCelsius(currentConditions.feelslike)} °C</p>
                    <p>{currentConditions.conditions} {getWeatherEmoji(currentConditions.conditions)}</p>
                </div>
            )}

            {weeks && weeks.length > 0 && (
                <div className="daily-forecast">
                    {weeks.map((week, weekIndex) => (
                        <div className="weekly-section" key={weekIndex}>
                            <h3>{formatDate(week.startDate)} - {formatDate(week.endDate)}</h3>
                            <table>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Temperature (°C)</th>
                                    <th>Feels Like (°C)</th>
                                    <th>Conditions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {week.weekDays.map((day, dayIndex) => (
                                    <tr key={dayIndex}>
                                        <td>{getDayName(day.datetime)}</td>
                                        <td>{toCelsius(day.temp)} °C</td>
                                        <td>{toCelsius(day.feelslike)} °C</td>
                                        <td>{day.conditions} {getWeatherEmoji(day.conditions)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

            {alerts && alerts.length > 0 && (
                <div className="alerts">
                    <h3>Alerts</h3>
                    {alerts.map((alert, index) => (
                        <div key={index}>
                            <h4>{alert.event}</h4>
                            <p>{alert.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const groupDaysByWeeks = (days) => {
    const weeks = [];
    let currentWeek = [];
    let startDate, endDate;

    days.forEach((day, index) => {
        const date = new Date(day.datetime);

        if (currentWeek.length === 0) {
            startDate = date;
            currentWeek.push(day);
        } else if (date.getDay() !== 0) {
            currentWeek.push(day);
        } else {
            endDate = new Date(currentWeek[currentWeek.length - 1].datetime);
            weeks.push({ weekDays: currentWeek, startDate, endDate });
            startDate = date;
            currentWeek = [day];
        }
    });

    if (currentWeek.length > 0) {
        endDate = new Date(currentWeek[currentWeek.length - 1].datetime);
        weeks.push({ weekDays: currentWeek, startDate, endDate });
    }

    return weeks;
};

export default WeatherCard;
