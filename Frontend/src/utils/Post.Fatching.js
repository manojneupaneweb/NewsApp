import axios from 'axios';

// Fetch all posts
export const fetchAllPosts = async () => {
    try {
        const response = await axios.get("/api/v1/posts/getallposts");
        return response.data;  // Return the data
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;  // You can handle the error more gracefully here if needed
    }
};

// Fetch post by ID
export const fetchPostById = async (postId) => {
    try {
        const response = await axios.get(`/api/v1/posts/getpostbyid/${postId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw error;
    }
};

// Fetch posts by category
export const fetchPostsByCategory = async (category) => {
    try {
        const response = await axios.get(`/api/v1/posts/getpostbycategory/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        throw error;
    }
};

