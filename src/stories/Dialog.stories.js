import Dialog from '../components/Dialog/Dialog';
import React from 'react';

export default {
    title: 'Components/Dialog',
    component: Dialog,
    render: ({ alertData, title }) => (
        <Dialog
            data={alertData}
            title={title}
        />
    ),
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        alertData: { control: { type: 'array' } },
        title: { control: { type: 'text' } },
    }
};


export const Main = {
    args: {
        alertData: [
            {
                sender_name: 'Instituto Nacional de Meteorologia',
                event: 'Chuvas Intensas',
                start: 1696162620,
                end: 1696251600,
                description: 'INMET publica aviso iniciando em: 01/10/2023 09:17. Chuva entre 20 e 30 mm/h ou até 50 mm/dia, ventos intensos (40-60 km/h). Baixo risco de corte de energia elétrica, queda de galhos de árvores, alagamentos e de descargas elétricas.',
                tags: [
                    'Flood',
                    'Coastal event'
                ]
            }
        ],
        title: 'Sofia, BG'
    },
};