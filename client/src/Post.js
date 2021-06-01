import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import AddComment from './AddComment';
import Comment from './Comment';
import AuthService from "./AuthService";

export default function Post(props){
  let post= props.getPost(props._id);
  const authService = new AuthService(`${props.api_url}/users/authenticate`);

  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);

  let submitted= <p></p>
  submitted= <p>Your comment has been submitted!</p>
  
  let commentsmarkup= <p></p>
  if (post){
    commentsmarkup= <div> {post.comments.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      }).map((comment, index) =>
      <div key={index} className="answer">
       <Comment comment={comment} post={post} url ={props.url}></Comment>
      </div>
      )}</div>
  }

//TO DO: GET post from GET request, send the id and not the entire post as props. that way auto update via state!!!


//   useEffect(() => {
//     // Update the document title using the browser API
//     document.title = `${count} times`;
//     const fetchData = async () => {
//       //fetch topics:
//       const response = await fetch(props.url + "/" + props._id);
// const data = await response.json();
//            //setPosts(data);
//            setComments(data);
          
//            commentsmarkup= <p> {comments.map((comment, index) =>
//             <div key={index} className="answer">
//              <Comment comment={comment} post={post} url ={props.url}></Comment>
//             </div>
//             )}</p>
//          };
//          fetchData();


//   }, [count]);

function addComment(comment, id) { 
    
    const bodyData= {comment: comment, _id: id, author: "Anonymous", date: new Date(Date.now())}
    fetch(`${props.url}/${id}`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authService.getToken()}`
      },
      body: JSON.stringify(bodyData),
    })
    .then(response => console.log(response.json()))
    .then(data => {
      console.log("data: " + data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    
  }

  if (post === undefined) {
    return <p>Nothing here</p>;
  } else{
    return (
      <>
      <div>
          <article className="question">
          <h1>{post.title}</h1>
        <div>
                     <p><span className="italic">Comments: {post.comments.length}</span></p>
                 </div>
          </article>
        <section>
        {/* {post.comments.map((comment, index) =>
        <div key={index} className="answer">
         <Comment comment={comment} post={post} url ={props.url}></Comment>
        </div>
        )} */}
        {commentsmarkup}
        </section>

        <AddComment addComment={addComment} setCount={setCount} _id={post._id} ></AddComment>
    
      
      </div>

      <button><Link to="/">Back</Link></button>
</>
    );
  } 



}