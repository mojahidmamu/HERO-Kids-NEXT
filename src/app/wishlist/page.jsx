import React from 'react';
import WishlistPage from '../../Components/Wishlist/WishlistPage';

export const metadata = {
  title: "My Wishlist - Hero Kidz",
  description: "View and manage your favorite products",
}

const Wishlist = () => {
    return (
        <div>
            <WishlistPage></WishlistPage>
        </div>
    );
};

export default Wishlist;