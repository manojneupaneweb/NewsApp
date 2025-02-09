import React, { useState } from 'react';
import axios from 'axios';
import TagInput from '../../components/Tag'; // Tag input component

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
    type: '', // 'success' or 'error'
    isVisible: false,
  });

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate file type (ensure it's an image)
    if (file && !file.type.startsWith('image')) {
      setNotification({
        message: 'Please upload a valid image file.',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ ...notification, isVisible: false });

    const token = localStorage.getItem('accessToken');

    // Prepare form data for API request
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('tags', JSON.stringify(tags));
    if (formData.image) {
      data.append('image', formData.image);
    } else {
      setNotification({
        message: 'Please upload an image.',
        type: 'error',
        isVisible: true,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://news-app-backend-ruby.vercel.app/api/v1/posts/createpost', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Post Created:', response.data);
      setNotification({ message: 'News posted successfully!', type: 'success', isVisible: true });

      // Reset form after successful submission
      setFormData({ title: '', content: '', category: '', image: null });
      setTags([]);

      // Hide notification after 3 seconds
      setTimeout(() => setNotification({ ...notification, isVisible: false }), 3000);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setNotification({
        message: error.response?.data?.message || 'Error posting news. Please try again.',
        type: 'error',
        isVisible: true,
      });

      // Hide notification after 3 seconds
      setTimeout(() => setNotification({ ...notification, isVisible: false }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Post News</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Content Input */}
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

        {/* Category Select */}
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
            <option value="Finance">Finance</option>
            <option value="Business">Business</option>
            <option value="Health">Health</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Sports">Sports</option>
            <option value="Technology">Technology</option>
            <option value="Opinion">Opinion</option>
          </select>
        </div>

        {/* Tags Input Component */}
        <TagInput tags={tags} setTags={setTags} />

        {/* Image Upload */}
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

        {/* Notification Message */}
        {notification.isVisible && (
          <div
            className={`absolute top-5 right-5 px-6 py-4 rounded shadow-lg text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            style={{ zIndex: 1000 }}
          >
            {notification.message}
          </div>
        )}

        {/* Submit Button */}
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
