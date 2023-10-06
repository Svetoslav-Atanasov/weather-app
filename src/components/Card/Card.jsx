import { Card, CardContent, CardMedia, Typography } from '@mui/material';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const WeatherCard = ({ data, date, id, units }) => {
    const navigate = useNavigate();

    const temperature = `${Math.floor(data[0].main?.temp)}${units}`;
    const weatherDescription = data[0].weather[0]?.main;
    const weatherIcon = data[0].weather[0]?.icon;

    const formatDate = (date) => {
        const dateObj = new Date(date);

        const day = dateObj.getDate().toString().padStart(2, '0');
        const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObj.getFullYear();

        const formattedDate = `${day}.${month}.${year}`;

        return formattedDate;
    };

    return (
        <Card
            data-test={`weather-card-${date}`}
            onClick={() => navigate(`${id}`, { state: { data, date, units } })}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: { xs: 2.5, sm: 0 },
                minWidth: { xs: '220px', sm: 'auto' },
                cursor: 'pointer'
            }}
        >
            <Typography
                color="text.secondary"
                sx={{ mt: 1, fontSize: { xs: 22, sm: 14 } }}>
                {formatDate(date)}
            </Typography>
            <CardMedia
                component="img"
                alt="Sample Image"
                image={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                title="Weather"
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography variant="h6">
                    {weatherDescription}
                </Typography>
                <Typography variant="h5">
                    {temperature}
                </Typography>
            </CardContent>
        </Card >
    );
}

export default WeatherCard;