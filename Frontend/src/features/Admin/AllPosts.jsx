import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [allPost, setAllPost] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleEdit = (id) => {
        navigate(`/admin/editpost/${id}`);
    };
    // Fetch all posts from the backend
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/posts'); // Adjust the URL as needed
            setPosts(response.data.posts);
            setFilteredPosts(response.data.posts); // Initial display of all posts
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Filter posts based on the search query
    const handleSearch = () => {
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    // Sort posts by date (newest first)
    const sortedPosts = filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Call fetchPosts on component mount
    useEffect(() => {
        fetchPosts();
    }, []);

    const getPost = async () => {
        try {
            const response = await axios.get(`/api/v1/posts/getallposts`);
            setAllPost(response.data.posts || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        getPost();
    }, []);

    // Delete a post
    const deletePost = async (postId) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete? ${postId}`);
        if (!isConfirmed) return;

        try {
            await axios.delete(`/api/v1/posts/deletepost/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
            alert('Post deleted successfully!');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div className="container">
            <div className="search-bar flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            <div className="posts-list">
                {sortedPosts.length === 0 ? (
                    <p>No posts found</p>
                ) : (
                    sortedPosts.map((post) => (
                        <div key={post._id} className="post-item mb-4 p-4 border rounded shadow-md flex items-center">
                            <div className="post-image w-1/4">
                                {post.image && <img src={post.image} alt={post.title} className="w-full h-auto rounded" />}
                            </div>
                            <div className="post-content w-3/4 ml-4">
                                <h3 className="text-xl font-bold">{post.title.length > 50 ? `${post.title.slice(0, 50)}...` : post.title}</h3>
                                <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
                                <div className="mt-4 flex justify-between">
                                    <link rel="stylesheet" href="" />
                                    <button onClick={() => handleEdit(post._id)} className="text-blue-500">Edit</button>
                                    <button onClick={() => deletePost(post._id)} className="text-red-500">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="posts-list mt-10">
                <h3 className='font-bold'>Other Posts</h3>
                <div className='flex flex-wrap'>
                    {allPost.map((post) => (
                        <div key={post._id} className="post-item mb-4 p-4 border rounded w-56 m-2">
                            {post.image && <img src={post.image} alt={post.title} className="w-40 h-auto rounded mb-2" />}
                            <h3 className="text-xl font-bold">{post.title.length > 50 ? `${post.title.slice(0, 30)}...` : post.title}</h3>
                            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                            <p className="text-gray-700 mt-2">{post.content.length > 50 ? `${post.content.slice(0, 30)}...` : post.title}</p>
                            <div className="mt-2 flex justify-between">
                                <Link to={`/admin/editpost/${post._id}`} className="ms-2 text-black font-bold bg-blue-500 hover:bg-cyan-600 p-2 block rounded-md">Edit</Link>
                                <button onClick={() => deletePost(post._id)} className="ms-2 text-black font-bold bg-red-500 hover:bg-cyan-600 p-2 block rounded-md">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default AllPosts;
