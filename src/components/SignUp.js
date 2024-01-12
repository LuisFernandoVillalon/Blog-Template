import React, { useState } from "react";
import '../style/style.css';
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassowrd: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://blog-api-qdjr.onrender.com/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          // Handle success if needed
          console.log("success");
          navigate("/log-in");
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle error state if needed
        }
      };

    return (

        <div class="form-container">
            <h1>Create an Account</h1>

            <form onSubmit={handleSubmit} class="sign-up-container" action="" method="POST">

                <div class="label-input-container">
                    <label for="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>

                <div class="label-input-container">
                    <label for="email">Email</label>
                    <input
                        name="email"
                        type="text"
                        onChange={handleInputChange}
                    />
                </div>

                <div class="label-input-container">
                    <label for="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={handleInputChange}
                    />
                </div>

                <div class="label-input-container">
                    <label for="confirmPassword">Confirm Password</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        onChange={handleInputChange}
                    />
                </div>

                <button class="submit-button">
                    Sign Up
                </button>

            </form>
        </div>

    )
}

