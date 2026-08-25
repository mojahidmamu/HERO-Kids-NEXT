import React from 'react';
import LoginForm from '../../Components/auth/LoginForm';

export const metadata = {
  title: "Login Page", 
  description: "Explore our wide range of products and find the perfect fit for your needs. From innovative solutions to everyday essentials, we have something for everyone.",
};

const Login = () => {
    return (
        <div>
            <h1>this is the login page</h1>
            <LoginForm />
        </div>
    );
};

export default Login;