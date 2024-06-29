import React, { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ImageBox = styled(Box)(({ theme, width, height }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: width,
  height: height,
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '@media (max-width: 600px)': {
    height: '50vw',
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  animation: `${fadeIn} 0.3s`,
}));

const PopOutImage = styled(Box)(({ theme, imageUrl }) => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '80vw',
  height: '80vh',
  borderRadius: '10px',
  transition: 'transform 0.3s ease-in-out',
}));

const Gallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length < 6) {
    return <p>Please provide at least 6 images.</p>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <ImageBox
            sx={{ backgroundImage: `url(${images[1]})` }}
            width="69%"
            height="30vw"
            onClick={() => handleImageClick(images[1])}
          />
          <ImageBox
            sx={{ backgroundImage: `url(${images[0]})` }}
            width="29%"
            height="30vw"
            onClick={() => handleImageClick(images[0])}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <ImageBox
            sx={{ backgroundImage: `url(${images[3]})` }}
            width="29%"
            height="30vw"
            onClick={() => handleImageClick(images[3])}
          />
          <ImageBox
            sx={{ backgroundImage: `url(${images[2]})` }}
            width="69%"
            height="30vw"
            onClick={() => handleImageClick(images[2])}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <ImageBox
            sx={{ backgroundImage: `url(${images[5]})` }}
            width="69%"
            height="30vw"
            onClick={() => handleImageClick(images[5])}
          />
          <ImageBox
            sx={{ backgroundImage: `url(${images[4]})` }}
            width="29%"
            height="30vw"
            onClick={() => handleImageClick(images[4])}
          />
        </Box>
      </Box>
      {selectedImage && (
        <Overlay onClick={handleClose}>
          <PopOutImage imageUrl={selectedImage} />
        </Overlay>
      )}
    </Box>
  );
};

export default Gallery;