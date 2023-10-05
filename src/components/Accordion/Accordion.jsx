import { Accordion, AccordionDetails, AccordionSummary, CardMedia, Stack, Typography } from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';

const WeatherAccordion = ({ data, units }) => {
    const { main, weather, wind } = data;

    const humidity = main?.humidity;
    const temperature = `${Math.floor(main?.temp)}${units}`;
    const weatherDescription = weather[0]?.description;
    const weatherIcon = weather[0]?.icon;
    const weatherShort = weather[0]?.main;
    const windSpeed = wind?.speed;

    const formatDate = () => {
        const dateObj = new Date(data.dt_txt);
        const hours = dateObj.getHours().toString().padStart(2, '0');
        const minutes = dateObj.getMinutes().toString().padStart(2, '0');
        const time = `${hours}:${minutes}`;
        return time;
    };

    return (
        <Accordion
            sx={{ width: { xs: 220, sm: 564 } }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
            >
                <Stack alignItems='center' direction='row' >
                    <Typography>{formatDate()}</Typography>
                    <CardMedia
                        alt="Weather Icon"
                        component="img"
                        image={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                        title="Weather"
                        sx={{ width: 50 }}
                    />
                    <Typography sx={{ mr: 1 }}>{weatherShort}</Typography>
                    <Typography>{temperature}</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Typography fontWeight="bold" variant="button" >
                    {`${weatherDescription}`}
                </Typography>
                <Typography>
                    {`Humidity: ${humidity}%`}
                </Typography>
                <Typography>
                    {`Wind Speed: ${windSpeed}m/s`}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default WeatherAccordion;