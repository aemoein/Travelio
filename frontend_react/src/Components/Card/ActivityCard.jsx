import React, { useState, useCallback } from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

const customMarkerIcon = L.divIcon({
    html: '<div><svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C5.59678 0 0 5.59678 0 12.5C0 18.5941 3.71992 25.3982 9.05714 33.1947C10.4573 34.961 12.1152 36.9579 12.5 37.4991C12.8848 36.9579 14.5427 34.961 15.9429 33.1947C21.2801 25.3982 25 18.5941 25 12.5C25 5.59678 19.4032 0 12.5 0ZM12.5 18C10.0147 18 8 15.9853 8 13.5C8 11.0147 10.0147 9 12.5 9C14.9853 9 17 11.0147 17 13.5C17 15.9853 14.9853 18 12.5 18Z" fill="#1976D2"/></svg></div>',
    className: 'custom-marker-icon',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const ActivityCard = React.memo(({ activity }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = useCallback(() => setOpen(true), []);
    const handleClose = useCallback(() => setOpen(false), []);

    const latitude = parseFloat(activity.latitude);
    const longitude = parseFloat(activity.longitude);

    return (
        <>
            <Card sx={styles.card}>
                <CardContent>
                    <Typography variant="h5" sx={styles.title}>
                        {activity.name}
                    </Typography>
                    <Grid container alignItems="center" sx={styles.locationContainer}>
                        <Grid item xs={1}>
                            <LocationOnIcon sx={styles.icon} />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={styles.location}>
                                {activity.location}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={styles.mapContainer}>
                        <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
                                <Popup>{activity.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box sx={styles.actionsContainer}>
                        <Typography variant="body2" sx={styles.time}>
                            {activity.time}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={styles.infoButton}>
                            More Info
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={styles.modal}>
                    <Typography variant="h6" sx={styles.modalTitle}>
                        Activity Details
                    </Typography>
                    <Typography sx={styles.modalText}>
                        {`Type: ${activity.type}`}
                    </Typography>
                    <Typography sx={styles.modalText}>
                        {`Details: ${activity.details}`}
                    </Typography>
                    <Button onClick={handleClose} sx={styles.closeButton}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
});

const styles = {
    card: {
        minWidth: 275,
        mb: 1,
        p: 1,
        border: '1px solid #ccc',
        borderRadius: '10px',
    },
    title: {
        fontFamily: 'Poppins',
        fontWeight: '900',
        fontSize: { xs: '18px', sm: '20px', md: '22px', lg: '20px' },
    },
    locationContainer: {
        mt: 2,
    },
    icon: {
        ml: -0.5,
    },
    location: {
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '16px' },
        ml: 1,
        mt: -0.5,
    },
    mapContainer: {
        height: '300px',
        mt: 2,
    },
    actionsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        mt: 2,
    },
    time: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: { xs: '22px', sm: '26px', md: '30px', lg: '26px' },
        mt: 0.5,
    },
    infoButton: {
        mt: 0,
        borderRadius: 5,
        fontFamily: 'Poppins',
        fontWeight: '900',
        fontSize: { xs: '12px', sm: '16px', md: '20px', lg: '16px' },
    },
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    },
    modalTitle: {
        fontFamily: 'Poppins',
        fontWeight: '700',
        fontSize: '24px',
    },
    modalText: {
        mt: 2,
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: '20px',
    },
    closeButton: {
        mt: 2,
        ml: -1.0,
    },
};

export default ActivityCard;