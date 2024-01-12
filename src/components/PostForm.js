import React, { useState } from "react";
import '../style/style.css';
import { useNavigate } from "react-router-dom";

export default function PostForm() {
    const navigate = useNavigate();
    const currentUserToken = localStorage.getItem('token');
    const [postData, setPostData] = useState({
        title: '',
        content: '',
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('https://blog-api-qdjr.onrender.com/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: currentUserToken
            },
            body: JSON.stringify(postData),
          });
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          // Handle success if needed
          navigate("/");
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle error state if needed
        }
      };

    return (

        <div class="form-container">
            <h1>Create a Message</h1>
                <form onSubmit={handleSubmit} class="log-in-container" action="/create-message" method="POST">

                    <div class="log-in-container">
                        <label for="title">Post Title</label>
                        <input
                            name="title"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div class="label-input-container">
                        <label for="content">Post Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="4"
                            cols="50"
                            onChange={handleInputChange}
                        >
                        </textarea>
                    </div>

                    <button class="submit-button">
                        Submit
                    </button>

                </form>
        </div>	

    )
}

