import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Modal, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InfoIcon from '@mui/icons-material/Info';
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

const ActivityCard = ({ activity }) => {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const latitude = parseFloat(activity.latitude);
    const longitude = parseFloat(activity.longitude);

    return (
        <>
            <Card sx={{ minWidth: 275, mb: 2, pl: 3, pr: 3, border: '1px solid #ccc', borderRadius: '10px' }}>
                <CardContent>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                        {activity.name}
                    </Typography>
                    <Grid container alignItems="center" sx={{ mt: 2 }}>
                        <Grid item xs={1}>
                            <LocationOnIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500' }}>
                                {activity.location}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box sx={{ height: '300px', mt: 2 }}>
                        <MapContainer center={[latitude, longitude]} zoom={13} style={{ width: '100%', height: '100%' }}>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[latitude, longitude]} icon={customMarkerIcon}>
                                <Popup>{activity.name}</Popup>
                            </Marker>
                        </MapContainer>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2" sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '30px' }}>
                            {`Time: ${activity.time}`}
                        </Typography>
                        <Button variant="outlined" onClick={handleOpen} sx={{ mt: 0 }}>
                            More Info
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <Modal open={open} onClose={handleClose}>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                    <Typography sx={{ fontFamily: 'Poppins', fontWeight: '700', fontSize: '24px'}}>
                        Activity Details
                    </Typography>
                    <Typography sx={{ mt: 2, fontFamily: 'Poppins', fontWeight: '400', fontSize: '20px' }}>
                        {`Type: ${activity.type}`}
                    </Typography>
                    <Typography sx={{ mt: 2 , fontFamily: 'Poppins', fontWeight: '400', fontSize: '20px'}}>
                        {`Details: ${activity.details}`}
                    </Typography>
                    <Button onClick={handleClose} sx={{ mt: 2, ml: -1.0 }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default ActivityCard;