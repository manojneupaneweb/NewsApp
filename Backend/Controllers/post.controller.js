import { Post } from "../Models/post.model.js"
import { User } from "../Models/user.model.js"
import { asyncHandler } from "../Utils/asyncHandler.util.js"
import { ApiError } from "../Utils/apiError.util.js"
import { ApiResponse } from "../Utils/apiResponse.util.js"
import { uploadOnCloudinary, deleteFromCloudinary } from '../Utils/cloudiny.util.js';
import axios from 'axios'

const createpost = asyncHandler(async (req, res) => {
  const { title, content, category, tags } = req.body;

  if ([title, content, category].some((field) => !field || field.trim() === "")) {
    throw new ApiError(400, "All fields (title, content, and category) are required");
  }

  if (!req.files || !req.files.image || req.files.image.length === 0) {
    throw new ApiError(400, "Image is required");
  }

  const localFilePath = req.files.image[0].path;

  const postImageUrl = await uploadOnCloudinary(localFilePath);

  const post = await Post.create({
    title,
    content,
    image: postImageUrl,
    category,
    tags,
    author: req.user._id,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      "Post created successfully",
      post
    )
  );
});

const editpost = async (req, res, next) => {
  const { id } = req.params;  // Extract post ID from the URL
  const { title, content, category, tags } = req.body;  // Extract data from the request body
  const image = req.files ? req.files.image : null;  // If an image is uploaded

  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return next(new ApiError(404, 'Post not found'));
    }

    // Check if the logged-in user is either an admin or the post creator
    if (req.user.role !== 'admin' && post.user.toString() !== req.user._id.toString()) {
      return next(new ApiError(403, 'You are not authorized to edit this post'));
    }

    // Delete the old image from Cloudinary if a new image is uploaded
    if (image && post.image) {
      await deleteImageFromCloudinary(post.image.public_id);  // Delete old image from Cloudinary
    }

    // If a new image is uploaded, upload it to Cloudinary
    let imageUploadResult = null;
    if (image) {
      imageUploadResult = await cloudinary.v2.uploader.upload(image.tempFilePath, {
        resource_type: 'auto',
      });
    }

    // Update the post with the new data
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.tags = tags || post.tags;
    if (imageUploadResult) {
      post.image = {
        url: imageUploadResult.secure_url,
        public_id: imageUploadResult.public_id,
      };
    }

    // Save the updated post
    await post.save();

    // Send the response with the updated post data
    return res.json(new ApiResponse(200, 'Post updated successfully', post));
  } catch (error) {
    console.error('Error updating post:', error);
    return next(new ApiError(500, 'Internal server error'));
  }
};

const getPostById = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId)
    .populate(
      'author',
      '-password -refreshToken -isOtpVerified -phone -_id -createdAt -email -updatedAt'
    );

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const relatedPosts = await Post.find({
    _id: { $ne: postId }, 
    $or: [
      { category: post.category },
      { tags: { $in: post.tags } }
    ]
  })
    .limit(6)
    .populate(
      'author',
      '-password -refreshToken -isOtpVerified -phone -_id -createdAt -email -updatedAt'
    );

  return res.json({ post, relatedPosts });
});


const getPostsByTag = asyncHandler(async (req, res) => {
  const tag = req.params.tag;

  const posts = await Post.find({
    tags: { $regex: new RegExp(tag, "i") }
  })
    .populate(
      'author',
      '-password -refreshToken -isOtpVerified -phone -_id -createdAt -email -updatedAt'
    );
  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: 'No posts found for this tag' });
  }

  return res.json(posts);
});


const deletepost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  if (req.user.role !== 'admin' && post.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this post");
  }

  if (post.image) {
    await deleteFromCloudinary(post.image);
  }

  const deletePost = await Post.findByIdAndDelete(postId);
  if (!deletePost) {
    return res.status(500).json({ message: 'Failed to delete post' });
  }

  return res.json(new ApiResponse(200, "Post deleted successfully"));
});


const deleteAllPosts = asyncHandler(async (req, res) => {
  try {
    // Using deleteMany to remove all posts
    await Post.deleteMany();
    res.status(200).json({ success: true, message: 'All posts have been deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete posts", error: error.message });
  }
});


const getAllPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch Posts", error: error.message });
  }
});


const getPostsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  const posts = await Post.find({
    category: { $regex: new RegExp(`^${category}$`, 'i') }
  }).populate(
    'author',
    '-password -refreshToken -isOtpVerified -phone -_id -createdAt -email -updatedAt'
  );

  if (!posts || posts.length === 0) {
    return res.status(404).json({ message: 'No posts found for this category' });
  }

  return res.json(posts);
});


const waitherInformation = asyncHandler(async (req, res) => {
  const apikey = '14628d06527ef42ac6d977adef12a65b';
  const weatherRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=${apikey}&units=metric&lang=ne`
  );

  // Air quality
  const airRes = await axios.get(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=27.7172&lon=85.3240&appid=${apikey}`
  );

  res.json({
    temp: weatherRes.data.main.temp,
    city: weatherRes.data.name,
    aqi: airRes.data.list[0].main.aqi,
  });
});




export {
  createpost, editpost, deletepost, getAllPosts, getPostById, getPostsByTag, getPostsByCategory, deleteAllPosts, waitherInformation
}