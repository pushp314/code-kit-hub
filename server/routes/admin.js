import express from 'express';
import User from '../models/User.js';
import Asset from '../models/Asset.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete user
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    await user.remove();
    
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/users/:id/role
// @desc    Update user role
// @access  Private/Admin
router.put('/users/:id/role', protect, admin, async (req, res) => {
  try {
    const { role } = req.body;
    
    if (!role || !['admin', 'seller', 'buyer'].includes(role)) {
      return res.status(400).json({ message: 'Valid role is required' });
    }
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    user.role = role;
    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/assets
// @desc    Get all assets for approval
// @access  Private/Admin
router.get('/assets', protect, admin, async (req, res) => {
  try {
    const assets = await Asset.find({})
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });
    
    res.json(assets);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/assets/:id/approve
// @desc    Approve an asset
// @access  Private/Admin
router.put('/assets/:id/approve', protect, admin, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    asset.isApproved = true;
    await asset.save();
    
    res.json({ message: 'Asset approved', asset });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/assets/:id/reject
// @desc    Reject an asset
// @access  Private/Admin
router.put('/assets/:id/reject', protect, admin, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    asset.isApproved = false;
    await asset.save();
    
    res.json({ message: 'Asset rejected', asset });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/assets/:id/feature
// @desc    Toggle featured status
// @access  Private/Admin
router.put('/assets/:id/feature', protect, admin, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    asset.isFeatured = !asset.isFeatured;
    await asset.save();
    
    res.json({
      message: asset.isFeatured ? 'Asset featured' : 'Asset unfeatured',
      asset,
    });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/stats
// @desc    Get platform statistics
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const assetCount = await Asset.countDocuments();
    const approvedAssetCount = await Asset.countDocuments({ isApproved: true });
    const featuredAssetCount = await Asset.countDocuments({ isFeatured: true });
    
    // Get counts by role
    const adminCount = await User.countDocuments({ role: 'admin' });
    const sellerCount = await User.countDocuments({ role: 'seller' });
    const buyerCount = await User.countDocuments({ role: 'buyer' });
    
    // Get counts by category
    const categories = [
      'ui-kits',
      'templates',
      'mini-projects',
      'utilities',
      'api-collections',
      'snippets',
      'project-starters',
    ];
    
    const categoryCounts = {};
    
    for (const category of categories) {
      categoryCounts[category] = await Asset.countDocuments({ category });
    }
    
    res.json({
      userCount,
      assetCount,
      approvedAssetCount,
      featuredAssetCount,
      usersByRole: {
        admin: adminCount,
        seller: sellerCount,
        buyer: buyerCount,
      },
      assetsByCategory: categoryCounts,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;