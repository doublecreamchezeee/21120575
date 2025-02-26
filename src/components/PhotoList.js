import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchPhotos } from '../utils/unsplashApi';
import { Box, Grid, Typography, CircularProgress, Card, CardMedia, CardContent } from '@mui/material'; // Material UI components

const PhotoList = () => {
  const [photos, setPhotos] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); 

  const loadMorePhotos = async () => {
    setLoading(true); 
    const response = await fetchPhotos(page); 
    if (response.data.length === 0) setHasMore(false); // Stop loading if no more photos are available
    setPhotos([...photos, ...response.data]); // Append new photos to the current list
    setLoading(false); 
    setPage(page + 1); // Increment page for the next fetch
  };

  useEffect(() => {
    loadMorePhotos(); // Fetch initial photos when component mounts
  }, []);

  // Infinite scrolling functionality
  window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
      loadMorePhotos(); 
    }
  };

  return (
    <Box sx={{ padding: '20px', backgroundColor: '#f4f6f8' }}>
      <Grid container spacing={4}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={photo.id}>
            <Link to={`/photos/${photo.id}`} style={{ textDecoration: 'none' }}>
              <Card
                sx={{
                  borderRadius: '12px',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={photo.urls.thumb} 
                  alt={photo.alt_description}
                  sx={{ borderRadius: '12px 12px 0 0' }} 
                />
                <CardContent>
                  <Typography variant="subtitle1" color="textPrimary" gutterBottom>
                    {photo.user.name} {/* Display the photo's author */}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress /> {/* Show loading spinner while fetching more photos */}
        </Box>
      )}

      {/* End of photos message */}
      {!hasMore && (
        <Typography variant="body1" align="center" sx={{ marginTop: '20px', color: 'gray' }}>
          No more photos to load. {/* Display message when no more photos are available */}
        </Typography>
      )}
    </Box>
  );
};

export default PhotoList;
