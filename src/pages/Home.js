import React, { useEffect, useState } from 'react';
import { initiateSocket, subscribe } from '../api/socket';
import { app } from '../config/app';
import Table from '../components/Table'
import Guage from '../components/Guage'
import {Container, Spinner} from 'react-bootstrap'

const roundToTwo = (num) => {    
    return +(Math.round(num + "e+2")  + "e-2");
}

const Home = () => {
    const [cities, setCities] = useState([]);
    let defaultCity = {
        city: "",
        percentage: 0,
        color: "white",
        start: 0,
        end: 100,
        label: "please select any city",
        type: ""
    }
    const [selectedCity, setSelectedCity] = useState(defaultCity);

    useEffect(() => {
        initiateSocket();
    }, []);

    useEffect(() => {
        subscribe((error, messages) => {
            if (error) return;
            let temp_cities = [...cities];
            messages.map((message) => {
                let date = new Date();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                message.time = `${hours} : ${minutes}`;
                message.aqi = roundToTwo(message.aqi);
                
                if (selectedCity.city == message.city) {
                    let aqi = message.aqi;
                    let typeOfCityIndex =  app.categories.findIndex((category) => aqi >= category.start && aqi <= category.end);
                    if (typeOfCityIndex > -1) {
                        
                        setSelectedCity({
                            city : message.city,
                            percentage: aqi,
                            color: app.categories[typeOfCityIndex].color,
                            start: app.categories[typeOfCityIndex].start,
                            end: app.categories[typeOfCityIndex].end,
                            type: app.categories[typeOfCityIndex].type,
                            label: `${message.city} aqi is ${app.categories[typeOfCityIndex].type}`
                        })
                    }
                }

                let messageInCities = temp_cities && temp_cities.findIndex((city) => city.city === message.city);
                messageInCities > -1 ? (temp_cities[messageInCities] = message) : temp_cities.push(message);
                
                return temp_cities;
            });
            return setCities(temp_cities);
        }, [])
    });
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-blue p-3 justify-content-center">
                <span class="navbar-brand">Air Quality Monitoring</span>
            </nav>
            <Container>
                <div>
                    
                    {
                        cities.length > 0 
                        ? (
                            <div>
                                <Guage selectedCity={selectedCity} cities={cities} setSelectedCity={setSelectedCity}/>
                                <Table cities={cities} /> 
                            </div>
                        )
                        : (
                            <div className="loader">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )
                    }
                </div>
            </Container>
        </>
        
    );
};

export default Home;
