import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  const totalStars = 5;
  let fullStars = Math.floor(rating);
  let halfStar = (rating % 1) !== 0 ? 1 : 0;
  let emptyStars = totalStars - fullStars - halfStar;

  return (
    <div className="flex items-center">
      {Array(fullStars).fill(0).map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
      {halfStar > 0 && <FaStarHalfAlt className="text-yellow-500" />}
      {Array(emptyStars).fill(0).map((_, index) => (
        <FaRegStar key={index} className="text-yellow-500" />
      ))}
    </div>
  );
};

export default RatingStars;
