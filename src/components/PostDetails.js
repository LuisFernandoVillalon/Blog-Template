import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function PostDetails() {
  const navigate = useNavigate();
  const { id } = useParams(); // Access the route parameter
  const [data, setData] = useState();
  const [commentData, setCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUserToken = localStorage.getItem('token');
  
  const deleteComment = async (data) => {
    try {
      const response = await fetch(`https://blog-api-qdjr.onrender.com/posts/${id}/comments/${data._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: currentUserToken // Set your headers if needed
          // Add any other necessary headers
        },
        // You can include a body for some DELETE requests, but it's often not required
        // body: JSON.stringify({ /* any data if needed */ }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success if needed
      console.log('Item deleted successfully');
      window.location.reload();
    } catch(error) {
      // Handle error if any
      console.error('There was a problem deleting the item:', error);
    }
  };

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://blog-api-qdjr.onrender.com/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: currentUserToken // Set your headers if needed
          // Add any other necessary headers
        },
        // You can include a body for some DELETE requests, but it's often not required
        // body: JSON.stringify({ /* any data if needed */ }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle success if needed
      console.log('Item deleted successfully');
      navigate("/");
    } catch(error) {
      // Handle error if any
      console.error('There was a problem deleting the item:', error);
    }
  };

  const ChangeRouteToUpdatePostForm = (id) => {
    navigate("/update-posts/"+id);
  }
  const ChangeRouteToUpdateCommentForm = (id, data) => {
    navigate("/update-comments/"+id+"/"+data._id);
  }
  const ChangeRouteToCommentForm = (id) => {
    navigate("/comment-form/"+id);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://blog-api-qdjr.onrender.com/posts/'+id+'/comments');
        if (!response.ok) {
           throw new Error('Network response was not ok.');
        }
        const resultComments = await response.json();
        setCommentData(resultComments.comments);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://blog-api-qdjr.onrender.com/posts/'+id);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const result = await response.json();
        setIsLoading(true);
        setData(result.post);
      } catch (error) {
        setIsLoading(true);
        setError(error);
      } 
    };

    fetchData();
  }, [error, id, isLoading]);

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  let temp = ""
  if (currentUser !== null && typeof currentUser === 'object') {
    temp = currentUser.userData.username;
  } else {
    temp = "";
  }
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoading) {
    return <div>Loading...</div>;
  } else {
  return (
    <div className="post-details-container">
      
      <h2>{data.title}</h2>
      <h4>By: {data.author.username}</h4>
      <p>{data.content}</p>
      
        {(data.author.username === temp) ?
          <div className="buttons-container">
            <button onClick={() => ChangeRouteToUpdatePostForm(id)}>Update</button>
            <button onClick={deletePost}>Delete</button>
          </div> :
          <></>
        }
      {(temp) ?
        <button onClick={() => ChangeRouteToCommentForm(id)} className="comment-button">Comment</button>
        :
        <></>
      }
      <div className="comments-container">
      <h3>Comments:</h3>
        {commentData.map((data) => (
          <div className="comment-container">
            <p>{data.comment}</p>
            <em>By: {data.user_ref.username}</em>
            {(data.user_ref.username === temp) ?
              <div className="comment-button-container">
                <button onClick={() => ChangeRouteToUpdateCommentForm(id, data)}>Update</button>
                <button onClick={() => deleteComment(data)}>Delete</button>
              </div> :
              <></>
            }
          </div>
        ))}
      </div>
    </div>
  );
        }
}

