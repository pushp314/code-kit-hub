import express from 'express';
import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import Asset from '../models/Asset.js';
import { protect, seller } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    // Allow zip files and images
    if (
      file.mimetype === 'application/zip' ||
      file.mimetype === 'application/x-zip-compressed' ||
      file.mimetype.startsWith('image/')
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only zip files and images are allowed'), false);
    }
  },
});

// @route   GET /api/assets
// @desc    Get all assets with filtering and pagination
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;
    
    // Build query
    const query = {};
    
    // Filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }
    
    // Filter by search term
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } },
      ];
    }
    
    // Filter by price
    if (req.query.free === 'true') {
      query.isFree = true;
    } else if (req.query.free === 'false') {
      query.isFree = false;
    }
    
    // Only show approved assets
    query.isApproved = true;
    
    // Count total documents
    const total = await Asset.countDocuments(query);
    
    // Determine sort order
    let sortOptions = {};
    switch (req.query.sort) {
      case 'oldest':
        sortOptions = { createdAt: 1 };
        break;
      case 'price-low':
        sortOptions = { price: 1 };
        break;
      case 'price-high':
        sortOptions = { price: -1 };
        break;
      case 'popular':
        sortOptions = { downloadCount: -1 };
        break;
      case 'newest':
      default:
        sortOptions = { createdAt: -1 };
    }
    
    // Execute query
    const assets = await Asset.find(query)
      .populate('seller', 'name avatar')
      .populate('reviews')
      .sort(sortOptions)
      .skip(startIndex)
      .limit(limit);
    
    // Return paginated results
    res.json({
      assets,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalAssets: total,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/assets/featured
// @desc    Get featured assets
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredAssets = await Asset.find({ isFeatured: true, isApproved: true })
      .populate('seller', 'name avatar')
      .populate('reviews')
      .limit(8);
    
    res.json(featuredAssets);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/assets/:id
// @desc    Get single asset
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id)
      .populate('seller', 'name email avatar bio website social isVerified')
      .populate({
        path: 'reviews',
        populate: {
          path: 'user',
          select: 'name avatar',
        },
      });
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.json(asset);
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/assets
// @desc    Create a new asset
// @access  Private/Seller
router.post(
  '/',
  protect,
  seller,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'previewImages', maxCount: 5 },
  ]),
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').isIn([
      'ui-kits',
      'templates',
      'mini-projects',
      'utilities',
      'api-collections',
      'snippets',
      'project-starters',
    ]),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    try {
      // Get asset data from request
      const {
        title,
        description,
        category,
        price,
        isFree,
        demoUrl,
        tags,
        features,
        technologies,
        requirements,
      } = req.body;
      
      // Check if file was uploaded
      if (!req.files || !req.files.file) {
        return res.status(400).json({ message: 'Please upload a file' });
      }
      
      // Create asset object
      const assetData = {
        title,
        description,
        category,
        price: isFree === 'true' ? 0 : parseFloat(price),
        isFree: isFree === 'true',
        seller: req.user._id,
        fileUrl: `/uploads/${req.files.file[0].filename}`,
        demoUrl: demoUrl || '',
        tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
        features: features ? features.split(',').map(feature => feature.trim()) : [],
        technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : [],
        requirements: requirements || '',
      };
      
      // Add preview images if uploaded
      if (req.files.previewImages) {
        assetData.previewImages = req.files.previewImages.map(
          image => `/uploads/${image.filename}`
        );
      }
      
      // Create and save asset
      const asset = new Asset(assetData);
      await asset.save();
      
      res.status(201).json(asset);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   PUT /api/assets/:id
// @desc    Update asset
// @access  Private/Seller
router.put(
  '/:id',
  protect,
  seller,
  upload.fields([
    { name: 'file', maxCount: 1 },
    { name: 'previewImages', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      // Get asset
      let asset = await Asset.findById(req.params.id);
      
      if (!asset) {
        return res.status(404).json({ message: 'Asset not found' });
      }
      
      // Check ownership
      if (asset.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(401).json({ message: 'Not authorized to update this asset' });
      }
      
      // Update fields
      const {
        title,
        description,
        category,
        price,
        isFree,
        demoUrl,
        tags,
        features,
        technologies,
        requirements,
      } = req.body;
      
      const updateData = {
        title: title || asset.title,
        description: description || asset.description,
        category: category || asset.category,
        price: isFree === 'true' ? 0 : (parseFloat(price) || asset.price),
        isFree: isFree === 'true' ? true : (isFree === 'false' ? false : asset.isFree),
        demoUrl: demoUrl || asset.demoUrl,
        tags: tags ? tags.split(',').map(tag => tag.trim()) : asset.tags,
        features: features ? features.split(',').map(feature => feature.trim()) : asset.features,
        technologies: technologies ? technologies.split(',').map(tech => tech.trim()) : asset.technologies,
        requirements: requirements || asset.requirements,
      };
      
      // Update file if uploaded
      if (req.files && req.files.file) {
        updateData.fileUrl = `/uploads/${req.files.file[0].filename}`;
      }
      
      // Update preview images if uploaded
      if (req.files && req.files.previewImages) {
        updateData.previewImages = req.files.previewImages.map(
          image => `/uploads/${image.filename}`
        );
      }
      
      // Update asset
      asset = await Asset.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      });
      
      res.json(asset);
    } catch (error) {
      console.error(error.message);
      
      if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Asset not found' });
      }
      
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// @route   DELETE /api/assets/:id
// @desc    Delete asset
// @access  Private/Seller
router.delete('/:id', protect, seller, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    // Check ownership
    if (asset.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to delete this asset' });
    }
    
    await asset.remove();
    
    res.json({ message: 'Asset removed' });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   POST /api/assets/:id/download
// @desc    Increment download count and get download link
// @access  Private
router.post('/:id/download', protect, async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    
    if (!asset) {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    // Increment download count
    asset.downloadCount += 1;
    await asset.save();
    
    // Return download link
    res.json({
      downloadUrl: asset.fileUrl,
    });
  } catch (error) {
    console.error(error.message);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Asset not found' });
    }
    
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;