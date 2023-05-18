import React from 'react';
import CodyAddComponent from './CodyAddComponent';
import CodyBlogComponent from './CodyBlogComponent';

const CodyPage = () => {
  return (
    <div style={{ display: 'inline-flex', justifyContent: 'space-evenly' }}>
      <CodyAddComponent />
      <CodyBlogComponent />
    </div>
  );
};
export default CodyPage;
