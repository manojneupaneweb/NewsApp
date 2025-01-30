import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Using useNavigate
import TagInput from '../../components/Tag'; // Assuming you have a tag input component

function EditPost() {
  const { postId } = useParams(); // Extract postId from URL
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null, // For file input
  });
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ isVisible: false, message: '', type: '' });
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Fetch the existing post data when the component mounts
    const fetchPostData = async () => {
      try {
        const response = await axios.get(`/api/v1/posts/getpostbyid/${postId}`);
        const postData = response.data;
        setFormData({
          title: postData.title,
          content: postData.content,
          category: postData.category,
          image: postData.image || '', // Assuming your backend sends the current image URL or path
        });
        setTags(postData.tags || []);
      } catch (error) {
        console.error('Error fetching post data:', error);
        setNotification({ isVisible: true, message: 'Failed to fetch post data', type: 'error' });
      }
    };
    fetchPostData();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedData = new FormData();
    updatedData.append('title', formData.title);
    updatedData.append('content', formData.content);
    updatedData.append('category', formData.category);
    updatedData.append('tags', tags.join(',')); // Assuming tags are sent as a comma-separated string
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    try {
      const response = await axios.put(`/api/v1/posts/editpost/${postId}`, updatedData);
      setNotification({ isVisible: true, message: 'Post updated successfully!', type: 'success' });
      navigate(`/admin/allpost`); // Redirect to the updated post page
    } catch (error) {
      console.error('Error updating post:', error);
      setNotification({ isVisible: true, message: 'Failed to update post', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Choose a category</option>
            <option value="World">World</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            {/* Add more categories here */}
          </select>
        </div>

        <TagInput tags={tags} setTags={setTags} /> {/* Tag Input Component */}

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {formData.image && <p>Current Image: {formData.image.name || formData.image}</p>}
        </div>

        {notification.isVisible && (
          <div
            className={`absolute top-5 right-5 px-6 py-4 rounded shadow-lg text-white ${
              notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ zIndex: 1000 }}
          >
            {notification.message}
          </div>
        )}

        {loading ? (
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled
          >
            Updating...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Update Post
          </button>
        )}
      </form>
    </div>
  );
}

export default EditPost;
