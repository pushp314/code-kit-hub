import React from 'react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">About Us</h1>
      <div className="prose max-w-none">
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our digital asset marketplace, where creators and consumers come together
          to exchange high-quality digital content.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Our platform provides a secure and user-friendly environment for buying and selling
          digital assets, ensuring both creators and purchasers have the best possible experience.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            To create a thriving ecosystem where digital creators can monetize their work
            while providing consumers with access to high-quality digital assets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;