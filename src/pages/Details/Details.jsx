import { Link, useLocation } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';

import React from 'react';
import WeatherAccordion from '../../components/Accordion/Accordion';

const Details = () => {
    const location = useLocation();
    const { data, date, units } = location.state || {};

    const displayWeatherCards = () => {
        return data.map(hourlyData => {
            return <Stack
                data-test={`weather-accordion-${hourlyData?.dt_txt}`}
                direction='row'
                key={hourlyData?.dt_txt}
            >
                <WeatherAccordion
                    id={date}
                    key={date}
                    data={hourlyData}
                    date={date}
                    units={units}
                />
            </Stack >

        })
    };

    const header = <Typography
        data-test='weather-app-details-header'
        component={Link}
        to={`/`}
        variant='h4'
        sx={{ mb: 3, textDecoration: 'none', color: 'inherit' }}>
        Weather App
    </Typography>

    return (
        <Stack alignItems="center" sx={{ mt: 3, mb: { xs: 5, sm: 0 }, mx: 2 }}>
            <Stack alignItems='center' sx={{ gap: 1 }}>
                {header}
                {displayWeatherCards()}
            </Stack>
        </Stack>
    );
}

export default Details;