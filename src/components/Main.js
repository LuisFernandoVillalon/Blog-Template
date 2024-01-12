import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import '../style/style.css';

export default function Header() {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://blog-api-qdjr.onrender.com/posts');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const result = await response.json();
          setData(result.posts);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }

    const ChangeRouteToIndvPost = (post) => {
        navigate("/posts/"+post._id);
    }
    
    return (
        <div className="main-container">
            <h1>Spotlight Posts</h1>
                {data.map((post) => (
                    <div onClick={() => ChangeRouteToIndvPost(post)} className="post-container" key={post.id}>
                        <h2>{post.title}</h2>
                        <h3>By: {post.author.username}</h3>
                        <p>{post.content}</p>
                    </div>
                ))}
        </div>
    )
}

