import React, { useState } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Social/sidebar';

const Create = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [zoom, setZoom] = useState(1.0);
  const [editor, setEditor] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setIsImageSelected(true);
    setSelectedFileName(file.name);
  };

  const handleZoomChange = (event) => {
    setZoom(parseFloat(event.target.value));
  };

  const handleSaveImage = async () => {
    if (!isImageSelected) {
      console.log('Please select an image.');
      return;
    }

    if (editor && token) {
      const formData = new FormData();
      formData.append('content', content);
      formData.append('media', image);

      try {
        setLoading(true);

        const response = await axios.post('http://localhost:7777/social/posts/create', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Post created:', response.data);

        setImage(null);
        setZoom(1.0);
        setContent('');
        setIsImageSelected(false);
        setSelectedFileName('');

        navigate('/social');
      } catch (error) {
        console.error('Error creating post:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    navigate('/social');
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          mt: 10,
          width: { sm: '50vw', md: '45vw', lg: '35vw' },
          mr: { sm: '15vw', md: '17.5vw', lg: '22.5vw' },
          ml: { sm: '35vw', md: '37.5vw', lg: '42.5vw' },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', mb: 2 }}>
          <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif' }}>Create Post</Typography>
        </Box>
        <TextField
          value={content}
          onChange={handleContentChange}
          label="Content"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ mb: 2, width: '450px' }}
          required
        />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%', // Ensure full width for centering
        }}>
          <Dropzone onDrop={handleImageDrop} multiple={false}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div
                  {...getRootProps({ className: 'dropzone' })}
                  style={{
                    width: '450px',
                    height: '450px',
                    border: '1px solid black',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}
                >
                  <input {...getInputProps()} />
                  {image ? (
                    <AvatarEditor
                      ref={(ref) => setEditor(ref)}
                      image={image}
                      width={450}
                      height={450}
                      border={20}
                      color={[255, 255, 255, 0.6]}
                      scale={zoom}
                      rotate={0}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins' }}>
                      Drop or click to upload an image
                    </Typography>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </Box>
        {image && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <input type="range" min="1" max="2" step="0.1" value={zoom} onChange={handleZoomChange} style={{ width: '100%' }} />
          </Box>
        )}
        {selectedFileName && (
          <Typography variant="body2" sx={{ mt: 1 }}>Selected File: {selectedFileName}</Typography>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" color="primary" sx={{ mr: 5 }} onClick={handleSaveImage} disabled={!editor || !content}>
            {loading ? <CircularProgress size={24} /> : 'Save Post'}
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Create;