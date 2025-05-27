import express from 'express';
import User from '../models/User.js';
import Asset from '../models/Asset.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      website: user.website,
      social: user.social,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, bio, website, github, twitter, linkedin } = req.body;
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (website) user.website = website;
    
    // Update social links
    if (github) user.social.github = github;
    if (twitter) user.social.twitter = twitter;
    if (linkedin) user.social.linkedin = linkedin;
    
    await user.save();
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatar: user.avatar,
      website: user.website,
      social: user.social,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/assets
// @desc    Get user's assets
// @access  Private
router.get('/assets', protect, async (req, res) => {
  try {
    const assets = await Asset.find({ seller: req.user._id })
      .populate('reviews')
      .sort({ createdAt: -1 });
    
    res.json(assets);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/purchases
// @desc    Get user's purchases
// @access  Private
router.get('/purchases', protect, async (req, res) => {
  try {
    // In a real app, this would query the Purchases collection
    // For now, just return an empty array
    res.json([]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/users/wishlist
// @desc    Get user's wishlist
// @access  Private
router.get('/wishlist', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: 'wishlist',
      populate: {
        path: 'seller',
        select: 'name avatar',
      },
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.wishlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/users/wishlist/:assetId
// @desc    Add asset to wishlist
// @access  Private
router.post('/wishlist/:assetId', protect, async (req, res) => {
  try {
    // Check if asset exists
    const asset = await Asset.findById(req.params.assetId);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if asset is already in wishlist
    if (user.wishlist.includes(req.params.assetId)) {
      return res.status(400).json({ message: 'Asset already in wishlist' });
    }
    
    // Add to wishlist
    user.wishlist.push(req.params.assetId);
    await user.save();
    
    // Return the added asset with populated fields
    const addedAsset = await Asset.findById(req.params.assetId).populate('seller', 'name avatar');
    
    res.json(addedAsset);
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/users/wishlist/:assetId
// @desc    Remove asset from wishlist
// @access  Private
router.delete('/wishlist/:assetId', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if asset is in wishlist
    if (!user.wishlist.includes(req.params.assetId)) {
      return res.status(400).json({ message: 'Asset not in wishlist' });
    }
    
    // Remove from wishlist
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.assetId
    );
    
    await user.save();
    
    res.json({ message: 'Asset removed from wishlist' });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;