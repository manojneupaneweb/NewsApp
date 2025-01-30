import React, { useState } from 'react';
import axios from 'axios';
import TagInput from '../../components/Tag';  // Assuming TagInput is a component to handle tags

function PostNews() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
  });
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: '',  // 'success' or 'error'
    isVisible: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ ...notification, isVisible: false }); // Hide notification on submit
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('tags', JSON.stringify(tags));
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      const response = await axios.post('/api/v1/posts/createpost', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure the correct header for file uploads
        },
      });
      console.log('Post Created:', response.data);
  
      setNotification({
        message: 'News posted successfully!',
        type: 'success',
        isVisible: true,
      });
  
      // Reset form after successful submission
      setFormData({ title: '', content: '', category: '', image: null });
      setTags([]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
  
      setNotification({
        message: 'Error posting news. Please try again.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Post News</h2>
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
            required
          />
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
            Posting...
          </button>
        ) : (
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Post News
          </button>
        )}
      </form>
    </div>
  );
}

export default PostNews;
