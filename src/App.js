import "./style/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header.js';
import Main from './components/Main.js';
import SignUp from './components/SignUp.js';
import LogIn from './components/LogIn.js';
import PostForm from "./components/PostForm.js";
import PostDetails from "./components/PostDetails.js";
import UpdatePostForm from "./components/UpdatePostForm.js";
import CommentForm from "./components/CommentForm.js";
import UpdateCommentForm from "./components/UpdateCommentForm.js";

const  App = () => {
  
  return (
    <div className="body-grid">
      
      <BrowserRouter path="/" >

      <Header />

        <Routes>

          <Route path="/sign-up" element={<SignUp />}/>

          <Route path="/log-in" element={<LogIn />}/>

          <Route path="/posts" element={<PostForm />}/>

          <Route path="/posts/:id" element={<PostDetails />}/>

          <Route path="/update-posts/:id" element={<UpdatePostForm />}/>

          <Route path="/update-comments/:id/:commentid" element={<UpdateCommentForm />}/>

          <Route path="/comment-form/:id" element={<CommentForm />}/>

          <Route path="/" element={<Main />}/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;