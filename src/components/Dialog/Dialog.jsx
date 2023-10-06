import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    Typography
} from '@mui/material';
import React, { useState } from 'react';

const AlertDialog = ({ data, title }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack data-test='weather-alert-dialog-button-open' sx={{ mb: 2 }}>
            <Button color='error' onClick={handleClickOpen} variant="contained" >
                Weather Alerts
            </Button>
            <Dialog
                data-test='weather-alert-dialog'
                open={open}
                onClose={handleClose}
            >
                <DialogTitle data-test='weather-alert-dialog-title'>
                    {`Weather alerts: ${title}`}
                </DialogTitle>
                {data.map(alert => {
                    return <Stack key={`${alert.event}-${alert.start}`}>
                        <DialogContent data-test='weather-alert-dialog-content' >
                            <Typography variant='h6'>{alert.sender_name}</Typography>
                            <DialogContentText>
                                {alert.description}
                            </DialogContentText>
                        </DialogContent>
                    </Stack>
                })}
                <DialogActions>
                    <Button data-test='weather-alert-dialog-button-close' onClick={handleClose} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default AlertDialog;