import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../style/style.css';
import { useNavigate } from "react-router-dom";

export default function UpdatePostForm() {
    const { id } = useParams(); // Access the route parameter
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const currentUserToken = localStorage.getItem('token');
    const [postData, setPostData] = useState({
        title: '',
        content: '',
    });
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/posts');
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            const currentPost = result.posts.filter((e) => {
              if (e._id === id) {
                return e;
              } else {
                return error;
              }
            })
            setPostData(currentPost[0]);
          } catch (error) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchData();
      }, [error, id]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:3000/posts/'+id, {
            method: 'PUT',
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
          navigate("/posts/"+id);
        } catch (error) {
          console.error('Error posting data:', error);
          // Handle error state if needed
        }
      };

    return (

        <div class="form-container">
            <h1>Update Message</h1>
                <form onSubmit={handleSubmit} class="log-in-container" action="/create-message" method="POST">

                    <div class="log-in-container">
                        <label for="title">Post Title</label>
                        <input
                            name="title"
                            type="text"
                            onChange={handleInputChange}
                            value={postData.title}
                        />
                    </div>

                    <div class="label-input-container">
                        <label for="contetn">Post Content</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="4"
                            cols="50"
                            onChange={handleInputChange}
                            value={postData.content}
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

