import { BrowserRouter } from 'react-router-dom';
import Card from '../components/Card/Card';
import React from 'react';

export default {
    title: 'Components/Card',
    component: Card,
    render: ({ data, date, units }) => (
        <BrowserRouter>
            <Card
                id={date}
                key={date}
                data={data}
                date={date}
                units={units}
            />
        </BrowserRouter>
    ),
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        data: { control: { type: 'array' } },
        date: { control: { type: 'text' } },
        units: {
            options: ['°C', '°F'],
            control: { type: 'select' }
        }
    }
};


export const Main = {
    args: {
        data: [{
            dt: 1696010400,
            main: {
                temp: 29.31,
                feels_like: 29.5,
                temp_min: 28.98,
                temp_max: 29.31,
                pressure: 1022,
                sea_level: 1022,
                grnd_level: 956,
                humidity: 43,
                temp_kf: 3.33
            },
            weather: [
                {
                    id: 800,
                    main: 'Clear',
                    description: 'clear sky',
                    icon: '01n'
                }
            ],
            clouds: {
                all: 10
            },
            wind: {
                speed: 0.94,
                deg: 43,
                gust: 1.21
            },
            visibility: 10000,
            pop: 0,
            sys: {
                pod: 'n'
            },
            dt_txt: '2023-09-29 18:00:00'
        }],
        date: '2023-11-11',
        units: '°C',
    },
};