import React, { useState } from "react";
import '../style/style.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function PostForm() {
    const navigate = useNavigate();
    const { id } = useParams(); // Access the route parameter
    const currentUserToken = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const [postData, setPostData] = useState({
        comment: '',
        user_ref: currentUser.userData._id
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/posts/'+id+'/comments', {
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
          navigate('/posts/'+id);
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle error state if needed
        }
      };

    return (

        <div class="form-container">
            <h1>Leave A Comment</h1>
                <form onSubmit={handleSubmit} class="log-in-container" action="/create-comment" method="POST">


                    <div class="label-input-container">
                        <label for="comment">Comment</label>
                        <textarea
                            id="comment"
                            name="comment"
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

