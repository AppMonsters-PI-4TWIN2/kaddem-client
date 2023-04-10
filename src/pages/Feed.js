import { useState, useEffect } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "../styles/post.module.css";
import styled from "../styles/feed.module.css";
//import { MoreVert } from "@material-ui/icons";
import profilePicture from '../styles/blank-profile-picture.png';
import likeIcon from "../styles/likeIcon.png";   
import heartIcon from "../styles/heartIcon.png"; 

import Navbar from "../components/Common/Navbar/navbar";
import Footer from "../components/Common/Footer/footer";

const Feed =(props) => {

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState([]);

    var user = JSON.parse( localStorage.getItem('user') );
    const owner = user._id;
    const namex = user.email;
    const [postId, setPostId] = useState('');
    const [content, setContent] = useState('');
  // ------------------------------------------------------------------------------------------
    const handleSubmit = async (event) => {
  
      event.preventDefault();
      var formData = new FormData(event.target);
      formData.append('owner', owner);
      
      await OnAddPost(formData);
    };
   // ------------------------------------------------------------------------------------------
    const OnAddPost = (formData) => {
      console.log(user.token)
      setIsLoading(true);
      axios
        .post(`/post/createPost`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${user.token}`
          },
        })
        .then((response) => {
          console.log("Post added successfully", response.data);
          // do something else, such as update the UI
          setPosts([response.data, ...posts]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error Posting ", error);
          // handle the error, such as displaying an error message to the user
          setError(error.message);
          setIsLoading(false);
        });
    };
 // ------------------------------------------------------------------------------------------
    const fetchPost = async () => {
        // const token = localStorage.getItem('token'); // Récupère le token stocké dans le local storage du navigateur
     
         const response = await axios.get('/post/posts', {
             headers: {'Authorization': `Bearer ${user.token}`}})
         setUsers(response.data)
         console.log(response.data);
     
       }
      // ------------------------------------------------------------------------------------------
       useEffect(()=>{
         const fetchPost = async () => {
           
          const response = await axios.get('/post/posts', {
           headers: {'Authorization': `Bearer ${user.token}`}})
           //setUsers(response.data)
           setPosts(response.data);
           console.log(response.data);
     
         }
         fetchPost()
       },[])



// ------------------------------------------------------------------------------------------
       const handleCommentSubmit = async (event) => {  
        event.preventDefault();        
        await onAddComment(postId,content);
      };
 // ------------------------------------------------------------------------------------------
const onAddComment = async (postId,content) => {
  console.log(postId)
  console.log(content)
  console.log(user.token)
  setIsLoading(true);
  axios
    .post(`/post/addComment`, { postId, content }, {
        headers: {'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`},
    })
    .then((response) => {
      console.log("Comment added successfully", response.data);
      // do something else, such as update the UI
      setComments([response.data, ...comments]);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log("Error Commenting ", error);
      // handle the error, such as displaying an error message to the user
      setError(error.message);
      setIsLoading(false);
    });
}
      // ------------------------------------------------------------------------------------------
       useEffect(()=>{
         const fetchComment = async () => {
          
          const response = await axios.get('/post/getComments', {postId}, {
           headers: {'Authorization': `Bearer ${user.token}`}})
           //setUsers(response.data)
           setComments(response.data);
           console.log(response.data);
    
         }
         fetchComment()
       },[])

    return (
        <div className={styled.feed}>
          <Navbar/>
        <div className={styled.feedWrapper}>
        <form onSubmit={handleSubmit} className={styles.post} >
          <textarea className={styles.postTop} rows="2" placeholder="What's on your mind?" type="text" name="caption" />
          <input type="file"  name="image" />
          <button type="submit" className="btn btn-outline-primary ms-1">Create Post</button>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>

        {/* {posts.reverse().map((post) => (
    <Card key= {post._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={post.image} />
      <Card.Body>
        <Card.Title>{post.caption}</Card.Title>
        <Card.Text>
          here should be text
        </Card.Text>
        <Button variant="primary">LIKE</Button>
      </Card.Body>
    </Card>))} */}
    {posts.reverse().map((post) => (
            <div key= {post._id + 1} className={styles.post} >
                <div className={styles.postWrapper}>
                    <div className={styles.postTop}>
                        <div className={styles.postTopLeft}>
                        <img className={styles.postProfileImg} src={profilePicture} alt="" />
                            {/* <Link to={`profile/${user.username}`}>
                                <img className={styles.postProfileImg} src={user.profilePicture ? PF + user.profilePicture : PF + "blank-profile-picture.png"} alt="" />
                            </Link> */}
                            <span className={styles.postUsername}>
                                {user.username}
                            </span>
                            <span className={styles.postDate}>
                                {post.owner}
                            </span>
                        </div>
                        <div className={styles.postTopRight}>
                             {/* <MoreVert />  */}
                        </div>
                    </div>
                    <div className={styles.postCenter}>
                        <span className={styles.postText}>
                            {post.caption}
                        </span>
                        <img className={styles.postImage} src={post.image} alt="" />

                    </div>
                    <div className={styles.postBottom}>
                        <div className={styles.postBottomLeft}>
                             <img className={styles.likeIcon} src={likeIcon}  alt="" />
                            <img className={styles.likeIcon} src={heartIcon}  alt="" />
                            {/* <span className={styles.postLikeCounter}>
                                {like} people like it
                            </span>  */}
                        </div>
                        <div className={styles.PostBottomRight}>
                            <span className={styles.postCommentText}>
                                {post.caption} comments
                            </span>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleCommentSubmit} className={styles.comment } >
          <textarea className={styles.postTop} rows="2" placeholder="What's on your mind?" type="text" name="content" onChange={(e) => {setPostId(post._id), setContent(e.target.value)}}/>
          <button type="submit" className="btn btn-outline-primary ms-1" >Comment</button>
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
        {comments.map((comment) => (
          <div>
            <span> {comment.content}</span>
            </div>
        ))}
            </div>))}
        </div>
        <Footer/>
        </div>
    )

}

export default Feed;