import React, { useState } from 'react';
import { Box, Typography, Modal } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { styled } from '@mui/system';
import PostCard from './postCard';

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  color: '#fff',
}));

const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius,
  '&:hover .overlay': {
    opacity: 1,
  },
}));

const Image = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const PostsGalleryCard = ({ post, socialId }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CardContainer sx={{ height: '300px', m: 1 }} onClick={handleOpen}>
        <Image src={post.mediaUrl} alt="Post" />
        <Overlay className="overlay">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FavoriteIcon sx={{ mr: 1 }} />
            <Typography sx={{ mr: 2 }}>{post.likes.length}</Typography>
            <CommentIcon sx={{ mr: 1 }} />
            <Typography>{post.comments.length}</Typography>
          </Box>
        </Overlay>
      </CardContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
        }}>
          <PostCard post={post} socialId={socialId} />
        </Box>
      </Modal>
    </>
  );
};

export default PostsGalleryCard;