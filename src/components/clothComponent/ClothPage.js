import React from 'react';
import ClothAddComponent from './ClothAddComponent';
import ClothBlogComponent from './ClothBlogComponent';
const ClothPage = () => {
  return (
    <div style={{ display: 'inline-flex', justifyContent: 'space-evenly' }}>
      <ClothAddComponent />
      <ClothBlogComponent />
    </div>
  );
};

export default ClothPage;
