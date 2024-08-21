// EditProfileModal.js
import React from 'react';
import { Box, Typography, Button, TextField, Grid, Modal } from '@mui/material';

const EditProfileModal = ({ open, handleClose, editData, handleInputChange, handleSaveChanges }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-profile-modal"
      aria-describedby="edit-profile-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          {['username', 'firstName', 'lastName', 'location', 'birthday', 'nationality', 'bio'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={editData[field] || ''}
                onChange={handleInputChange}
              />
            </Grid>
          ))}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges} sx={{ mr: 1 }}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditProfileModal;