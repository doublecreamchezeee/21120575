import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/photos');
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Photo Gallery
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Discover beautiful photos from Unsplash
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleNavigate}
        sx={{ padding: '10px 20px', borderRadius: '8px', fontSize: '1.2rem' }}
      >
        View Photos
      </Button>
    </Container>
  );
};

export default WelcomePage;
