// Base API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Asset Categories
export const ASSET_CATEGORIES = [
  {
    id: 'ui-kits',
    name: 'UI Kits',
    icon: 'layout',
    description: 'Pre-designed user interface components, screens, and layouts.',
  },
  {
    id: 'templates',
    name: 'Frontend & Backend Templates',
    icon: 'code',
    description: 'Ready-to-use, structured templates for entire applications.',
  },
  {
    id: 'mini-projects',
    name: 'Mini Projects',
    icon: 'box',
    description: 'Small, functional applications demonstrating specific features.',
  },
  {
    id: 'utilities',
    name: 'Code Utilities',
    icon: 'tool',
    description: 'Reusable helper functions, hooks, services, and utility scripts.',
  },
  {
    id: 'api-collections',
    name: 'API Collections',
    icon: 'server',
    description: 'Collections of RESTful or GraphQL APIs with documentation.',
  },
  {
    id: 'snippets',
    name: 'Snippets & Components',
    icon: 'code-2',
    description: 'Small, reusable code blocks and UI components for specific tasks.',
  },
  {
    id: 'project-starters',
    name: 'Full Project Starters',
    icon: 'rocket',
    description: 'Complete project boilerplates with full-stack setup.',
  },
];

// File upload size limits
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

// App title and metadata
export const APP_NAME = 'CodeKitHub';
export const APP_DESCRIPTION = 'Marketplace for developers to buy and sell code assets';

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 12;