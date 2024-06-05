import React from 'react';

function ReviewCard({ item, title, address, image }) {
  const placeholderImage = 'https://via.placeholder.com/200'; // Placeholder image URL

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg transform transition duration-500 hover:scale-105">
      <div className="bg-blue-500 text-white p-4 font-bold text-xl">{title}</div>
      <img className="w-full h-40 object-cover" src={image.length > 10 ? image : placeholderImage} alt={title} />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-base">{address}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
