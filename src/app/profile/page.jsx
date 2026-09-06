import React from 'react';
import ProfilePage from '../../Components/Profile/ProfilePage';

export const metadata = {
  title: "My Profile - Hero Kidz",
  description: "View and manage your Hero Kidz account profile",
};

const Profile = () => {
    return (
        <div>
             <ProfilePage></ProfilePage>
        </div>
    );
};

export default Profile;