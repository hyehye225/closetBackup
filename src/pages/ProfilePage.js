import React from 'react';
import ProfileTemplate from '../components/profile(구버전,삭제예정)/ProfileTemplate';
import ProfileForm from '../components/profile(구버전,삭제예정)/ProfileForm';

const ProfilePage = () => {
  return (
    <ProfileTemplate>
      <ProfileForm type="profile" />
    </ProfileTemplate>
  );
};

export default ProfilePage;
