import React, { useState } from "react";
import '../style/style.css';
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://blog-api-qdjr.onrender.com/log-in', {
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
          const data = await response.json();
          const token = data.token;
          const currentUser = { userData: data.user};
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(currentUser));
          navigate("/");

        } catch (error) {
          console.error('Error posting data:', error);
          // Handle error state if needed
        }
      };

    return (

        <div class="form-container">
            <h1>Log In</h1>

            <form onSubmit={handleSubmit} class="log-in-container" action="/log-in" method="POST">

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

                <button class="submit-button">
                    Log In
                </button>
                            
            </form>

        </div>	

    )
}

