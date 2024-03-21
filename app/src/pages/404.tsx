import Link from "next/link";
import React from "react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <Link href="/" className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-6 rounded-lg transition-colors duration-300">
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
