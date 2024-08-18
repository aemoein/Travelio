import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar, IconButton, TextField, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const PostCard = ({ post, socialId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length); // Initialize with the initial like count
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(post.comments); // Initialize comments state with existing comments

  useEffect(() => {
    setLiked(post.likes.includes(socialId));
    setLikeCount(post.likes.length);
    setComments(post.comments);
  }, [post.likes, post.comments, socialId]);

  const handleLike = async () => {
    try {
      const endpoint = liked ? `http://localhost:7777/social/posts/unlike/${post._id}` : `http://localhost:7777/social/posts/like/${post._id}`;
      const response = await axios.post(endpoint, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Like/Unlike response:', response.data);
      setLiked(!liked); 
      setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
      console.error('Error liking/unliking post:', error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:7777/social/posts/comment/${post._id}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log('Add comment response:', response.data);

      // Reload the page to reflect the new comment
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:7777/social/posts/uncomment`, {
        data: {
          postId: post._id,
          commentId: commentId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Remove comment response:', response.data);

      // Filter out the removed comment from comments state
      const updatedComments = comments.filter((comment) => comment._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error removing comment:', error);
    }
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2, boxShadow: 3, mb: 2, bgcolor: '#fff' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={post.profilePic} sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: '25px', background: 'linear-gradient(to right, #6b778d, #ff6b6b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{post.username}</Typography>
        </Box>
        <IconButton onClick={handleLike} sx={{ color: liked ? '#ff6b6b' : 'rgba(0, 0, 0, 0.54)', transition: 'color 0.3s ease-in-out' }}>
          {liked ? <FavoriteIcon fontSize="large" /> : <FavoriteBorderIcon fontSize="large" />}
        </IconButton>
      </Box>
      <Typography sx={{ mb: 1, fontFamily: 'Poppins', fontWeight: '500', fontSize: '15px' }}>{post.content}</Typography>
      {post.mediaUrl && (
        <Box sx={{
          width: '100%',
          height: 0,
          paddingBottom: '100%',
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
          mb: 2
        }}>
          <Box
            component="img"
            src={post.mediaUrl}
            alt="media"
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </Box>
      )}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={toggleComments}>
          <CommentIcon />
        </IconButton>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontFamily: 'Poppins', fontWeight: '500', fontSize: '15px' }}>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</Typography>
      </Box>
      {showComments && (
        <Box sx={{ mt: 2 }}>
          {comments.map((comment, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="body2" sx={{ mb: 1, flex: 1, fontFamily: 'Poppins', fontSize: '16px' }}>
                <strong>{comment.username}: </strong>
                {comment.content}
              </Typography>
              {comment.user === socialId && (
                <IconButton onClick={() => handleRemoveComment(comment._id)} sx={{mt: -1}}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
          <TextField
            value={newComment}
            onChange={handleCommentChange}
            variant="outlined"
            fullWidth
            placeholder="Add a comment..."
            sx={{ mt: 1}}
          />
          <Button onClick={handleAddComment} variant="contained" color="primary" sx={{ mt: 1, width: '100%', fontFamily: 'Poppins', fontWeight: '700', fontSize:'18px', borderRadius: '20px', backgroundImage: 'linear-gradient(to right, #6b778d, #ff6b6b)' }}>
            Post Comment
          </Button>
        </Box>
      )}
      <Typography variant="body2" color="text.secondary" sx={{ ml: 1, fontFamily: 'Poppins', fontSize: '15px', fontWeight: '500' }}>
        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
      </Typography>
    </Box>
  );
};

export default PostCard;