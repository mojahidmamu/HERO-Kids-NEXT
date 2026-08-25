import React from 'react'; 
import LoginPage from '../../Components/auth/LoginPage';

export const metadata = {
  title: "Login Page", 
  description: "Explore our wide range of products and find the perfect fit for your needs. From innovative solutions to everyday essentials, we have something for everyone.",
};

const Login = () => {
    return (
        <div>
            <h1>this is the login page</h1>
            <LoginPage></LoginPage>
        </div>
    );
};

export default Login;