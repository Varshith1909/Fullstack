import React from 'react';
import '../assets/css/Homepage.css';
import Img1 from '@/assets/images/pharma.jpeg';

export const Header = () => {
  return (
    <div className="header-container">
      <div className="image-container">
        <img src={Img1} alt="My Image" />
      </div>
      <div className="text-container">
        <h3>We care for your health Every moment</h3>
        <p>If you are searching for the best website to assist you in managing all the medicines in your store, you have found the right place.</p>
      </div>
    </div>
  );
};
