import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPhotoDetails } from '../utils/unsplashApi';
import { Box, Typography, Paper, CircularProgress } from '@mui/material';

const PhotoDetails = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const loadPhotoDetails = async () => {
      const response = await fetchPhotoDetails(id);
      setPhoto(response.data);
    };
    loadPhotoDetails();
  }, [id]);

  if (!photo) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
        backgroundColor: '#f4f6f8',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: '900px',
          width: '100%',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <img
          src={photo.urls.full}
          alt={photo.alt_description}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '12px 12px 0 0',
          }}
        />
        <Box sx={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {photo.description || 'Untitled Photo'}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            By {photo.user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ marginTop: '20px' }}>
            {photo.alt_description || 'No description available.'}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default PhotoDetails;
