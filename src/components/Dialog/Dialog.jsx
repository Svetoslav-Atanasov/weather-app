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
        <Stack sx={{ mb: 2 }}>
            <Button color='error' onClick={handleClickOpen} variant="contained" >
                Weather Alerts
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {`Weather alerts: ${title}`}
                </DialogTitle>
                {data.map(alert => {
                    return <Stack key={`${alert.event}-${alert.start}`}>
                        <DialogContent >
                            <Typography variant='h6'>{alert.sender_name}</Typography>
                            <DialogContentText>
                                {alert.description}
                            </DialogContentText>
                        </DialogContent>
                    </Stack>
                })}
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">Close</Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
}

export default AlertDialog;