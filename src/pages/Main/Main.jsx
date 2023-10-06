import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import AlertDialog from '../../components/Dialog/Dialog';
import WeatherCard from '../../components/Card/Card';
import db from '../../db'

const Main = () => {
    const [alertData, setAlertData] = useState([]);
    const [coordinates, setCoordinates] = useState({});
    const [weatherData, setWeatherData] = useState({});
    const [units, setUnits] = useState('metric');

    const alertRequest = `https://openweathermap.org/data/2.5/onecall?units=${units}&lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=439d4b804bc8187953eb36d2a8c26a02`;
    const measurements = { metric: '°C', imperial: '°F' };
    const title = 'Weather App';
    const weatherRequest = `https://api.openweathermap.org/data/2.5/forecast?units=${units}&lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=e1656b868404c2cb08f5edf191cf41e3`;

    const changeMeasurements = async () => {
        const newUnit = units === 'metric' ? 'imperial' : 'metric';
        setUnits(newUnit);

        try {
            await db.units.update(1, { unit: newUnit });
        } catch (error) {
            console.error('Error updating default unit:', error);
        }
    };

    const currentLocation = () => {
        const coordinates = {};
        navigator.geolocation.getCurrentPosition(function (position) {
            setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        })
        return coordinates;
    };

    const renderWeatherCards = () => {
        if (isEmpty(weatherData)) return;
        const groupedData = weatherData?.list.reduce((acc, data) => {
            const date = data.dt_txt.split(' ')[0];
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(data);
            return acc;
        }, {});

        const weatherCards = Object.keys(groupedData).map((date, index) => {
            if (index < 5) {
                return (
                    <WeatherCard
                        id={date}
                        key={date}
                        data={groupedData[date]}
                        date={date}
                        units={measurements[units]}
                    />
                );
            }
            return null;
        });

        return (
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                sx={{ gap: { xs: 0, sm: 2 }, mb: { xs: 5, sm: 0 } }}
            >
                {weatherCards}
            </Stack>
        );
    }

    const isEmpty = (obj) => Object.keys(obj).length === 0;

    const header = <Typography sx={{ mb: 3 }} variant='h4'>{title}</Typography>;

    const subHeader = <Stack alignItems='center' direction="row" sx={{ gap: 1, mb: 1.5 }} >
        <Typography variant='h6'>{`${weatherData?.city?.name || ''}, ${weatherData?.city?.country || ''}`}</Typography>
        <Button
            variant='outlined'
            onClick={changeMeasurements}
        >{measurements[units]}
        </Button>
    </Stack>

    const alerts = alertData.length > 0 && <AlertDialog data={alertData} title={`${weatherData?.city?.name || ''}, ${weatherData?.city?.country || ''}`} />

    useEffect(() => {
        async function setDefaultUnit() {
            try {
                const existingEntry = await db.units.get(1);

                if (existingEntry) {
                    await db.units.update(1, { unit: 'metric' });
                } else {
                    await db.units.put({ id: 1, unit: 'metric' });
                }
            } catch (error) {
                console.error('Error setting default unit:', error);
            }
        }

        setDefaultUnit();
    }, []);

    useEffect(() => {
        async function getDefaultUnit() {
            try {
                const defaultUnit = await db.units.get(1);
                setUnits(defaultUnit?.unit || 'metric');
            } catch (error) {
                console.error('Error getting default unit:', error);
            }
        }

        getDefaultUnit();
    }, []);

    useEffect(() => {
        currentLocation();
    }, []);

    useEffect(() => {
        const fetchWeather = async () => {
            if (coordinates.latitude && coordinates.longitude) {
                try {
                    const response = await fetch(weatherRequest);
                    const data = await response.json();
                    setWeatherData(data);
                } catch (err) {
                    console.error(err)
                }
            };
        }
        fetchWeather();
    }, [coordinates, units, weatherRequest]);

    useEffect(() => {
        const fetchAlert = async () => {
            if (coordinates.latitude && coordinates.longitude) {
                try {
                    const response = await fetch(alertRequest);
                    const data = await response.json();
                    setAlertData(data?.alerts || []);
                } catch (err) {
                    console.error(err)
                }
            };
        }
        fetchAlert();
    }, [alertRequest, coordinates, units]);

    return (
        <Stack alignItems="center" sx={{ mt: 3 }}>
            <Stack alignItems='center'>
                {header}
                {isEmpty(weatherData) ? <CircularProgress /> : <>
                    {subHeader}
                    {alerts}
                    {renderWeatherCards()}
                    <Stack>
                    </Stack>
                </>}
            </Stack>
        </Stack >
    );
}

export default Main;