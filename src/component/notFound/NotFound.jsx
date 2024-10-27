// src/components/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-xl text-gray-800">Page Not Found</p>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <a
        href="/"
        className="mt-6 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
