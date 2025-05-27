import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Twitter, Facebook, Instagram, Github as GitHub, Linkedin } from 'lucide-react';
import { APP_NAME } from '../../config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">{APP_NAME}</span>
            </div>
            <p className="text-gray-400 text-base leading-6">
              The premier marketplace for developers to buy and sell high-quality code assets, templates, and components.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <GitHub className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-3">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Categories
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/marketplace/category/ui-kits" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      UI Kits
                    </Link>
                  </li>
                  <li>
                    <Link to="/marketplace/category/templates" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Templates
                    </Link>
                  </li>
                  <li>
                    <Link to="/marketplace/category/mini-projects" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Mini Projects
                    </Link>
                  </li>
                  <li>
                    <Link to="/marketplace/category/utilities" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Code Utilities
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  More Categories
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/marketplace/category/api-collections" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      API Collections
                    </Link>
                  </li>
                  <li>
                    <Link to="/marketplace/category/snippets" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Snippets & Components
                    </Link>
                  </li>
                  <li>
                    <Link to="/marketplace/category/project-starters" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Project Starters
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/about" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link to="/privacy" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/licenses" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      License
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-base text-gray-400 hover:text-primary-500 transition-colors">
                      Cookie Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-base text-gray-400 text-center">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;