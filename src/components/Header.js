import { useNavigate } from "react-router-dom";
import React from "react";
import '../style/style.css';

export default function DisplayHeader() {

    const navigate = useNavigate();
    const ChangeRouteToSignUp = () => {
        navigate("/sign-up");
    }
    const ChangeRouteToHome = () => {
        navigate("/");
    }
    const ChangeRouteToLogIn = () => {
        navigate("/log-in");
    }
    const ChangeRouteToLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
        navigate("/");
    }
    const ChangeRouteToCreatePost = () => {
        navigate("/posts");
    }

    const currentUserToken = localStorage.getItem('token');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    return (
        <header className="page-title">
            <div className="pointer" onClick={ChangeRouteToHome}>La Tribuna</div>
            <div className="link-container">
            {currentUserToken ? 
                <>
                    <div>Welcome, {currentUser.userData.username}</div>
                    <div className="pointer" onClick={ChangeRouteToCreatePost}>Create Post</div>
                    <div className="pointer" onClick={ChangeRouteToLogOut}>Log Out</div> 
                </> : 
                <>
                    <div className="pointer" onClick={ChangeRouteToSignUp}>Sign Up</div>
                    <div className="pointer" onClick={ChangeRouteToLogIn}>Log In</div>
                </>
            }
            </div>
        </header>
    )
}

