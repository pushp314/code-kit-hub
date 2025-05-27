import mongoose from 'mongoose';

const assetSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'ui-kits',
      'templates',
      'mini-projects',
      'utilities',
      'api-collections',
      'snippets',
      'project-starters',
    ],
  },
  price: {
    type: Number,
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileUrl: {
    type: String,
    required: [true, 'Please add a file URL'],
  },
  previewImages: {
    type: [String],
    default: [],
  },
  demoUrl: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  features: {
    type: [String],
    default: [],
  },
  technologies: {
    type: [String],
    default: [],
  },
  requirements: {
    type: String,
    default: '',
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  version: {
    type: String,
    default: '1.0.0',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual for reviews
assetSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'asset',
  justOne: false,
});

// Virtual for average rating
assetSchema.virtual('rating').get(function() {
  if (this.reviews && this.reviews.length > 0) {
    const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / this.reviews.length).toFixed(1);
  }
  return 0;
});

const Asset = mongoose.model('Asset', assetSchema);

export default Asset;