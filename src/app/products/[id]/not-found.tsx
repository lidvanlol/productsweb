import React from "react";
import Link from "next/link";

export default function NotFound(): React.JSX.Element {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Product Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The product you're looking for doesn't exist or has been removed.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Return to Home
      </Link>
    </div>
  );
}
