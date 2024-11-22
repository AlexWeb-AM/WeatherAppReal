import React, { useState } from 'react';
import './weather.scss';
import { IoSearch } from "react-icons/io5";
import axios from 'axios';

interface WeatherData {
    uvIndex: number;
    humidity: number;
    wind: {
        speed: number;
        direction: string;
    };
    temperature: {
        current: number;
        feelsLike: number;
    };
    icon: string;  
    cityName: string,
}

const weatherIconMap: { [key: string]: string } = {
    "01d": "/images/clear_sky.png",
    "01n": "/images/clear_sky_night.png",
    "02d": "/images/partly_cloudy.png",
    "02n": "/images/partly_cloudy-night.png",
    "03d": "/images/cloud.png",
    "03n": "/images/cloud.png",
    "04d": "/images/cloud.png",
    "04n": "/images/cloud.png",
    "09d": "/images/rain.png",
    "09n": "/images/rain.png",
    "10d": "/images/rain.png",
    "10n": "/images/rain.png",
    "11d": "/images/storm.png",
    "11n": "/images/storm.png",
    "13d": "/images/flake.png",
    "13n": "/images/flake.png",
    "50d": "/images/fog.png",
    "50n": "/images/fog.png"
};

const Weather = () => {

    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    const fetchData = async () => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=fca85bd908077e95a67da0c49bb1e8de`
            );
            
            if (response.data.cod === '404') {
                alert('City not found!');
                return;
            }

            const data = response.data;

            const parsedWeatherData: WeatherData = {
                uvIndex: 0,
                humidity: data.main.humidity,
                wind: {
                    speed: data.wind.speed,
                    direction: getWindDirection(data.wind.deg),
                },
                temperature: {
                    current: data.main.temp,
                    feelsLike: data.main.feels_like,
                },
                icon: data.weather[0].icon,
                cityName: data.name,  
            };

            setWeatherData(parsedWeatherData);
            console.log(parsedWeatherData);
        } catch (error) {
            console.error(error);
            alert('City not find:Try Again:)');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetchData();
    };

    const getWindDirection = (degree: number): string => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degree / 45) % 8;
        return directions[index];
    };


    return (
        <div className='weather_div'>
            <div className='search_div'>
                <form onSubmit={handleSubmit} className='flex'>
                    <input value={city} onChange={handleInputChange} type="text" placeholder='Search' />
                    <button type='submit'><IoSearch /></button>
                </form>
            </div>
            {weatherData ? (
                <div className='weather_data'>
                    <img src={weatherIconMap[weatherData.icon]} alt="Weather Icon" width='150px' />
                    <h3>{weatherData.temperature.current}°C</h3>
                    <h4>{weatherData.cityName}</h4>
                    <div className='bottom_div'>
                        <div >
                            <img src="images/humdity.svg" alt="" />
                            <div>
                                <h5 className='mr-6 mt-1'>{weatherData.humidity}%</h5>
                                <h5 className='mr-9'>Humdity</h5>
                            </div>
                        </div>
                        <div>
                            <img src="images/wind.svg" alt="" />
                            <div>
                                <h5 className='ml-5 mt-1'>{weatherData.wind.speed}km/h</h5>
                                <h5 className='mr-16'>Wind</h5>
                            </div>
                        </div>
                        <div >
                            <img src="images/UV_index.svg" alt="" />
                            <div>
                                <h5 className='mr-12 mt-0.5'>{weatherData.uvIndex}</h5>
                                <h5 className='mr-8'>UV Index</h5>
                            </div>
                        </div>
                        <div >
                            <img src="images/temperature.svg" alt="" />
                            <div>
                                <h5 className='mr-2 mt-1'>{weatherData.temperature.current}ºC</h5>
                                <h5 className='ml-4'>Temperature</h5>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1>Search <br /> City</h1>
            )}
        </div>
    );
};

export default Weather;
