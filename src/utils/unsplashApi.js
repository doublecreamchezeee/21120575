import axios from 'axios'; 

// Environment variables for API URL and Access Key
const API_URL = process.env.REACT_APP_API_URL;
const ACCESS_KEY = process.env.REACT_APP_API_ACCESS_KEY;

// Function to fetch photos list
export const fetchPhotos = (page = 1) => {
    console.log(API_URL); 
    return axios.get(`${API_URL}/photos`, {
        params: { page, per_page: 10 }, 
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` } 
    });
};

// Function to fetch details of a specific photo by ID
export const fetchPhotoDetails = (id) => {
    return axios.get(`${API_URL}/photos/${id}`, { 
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
    });
};
