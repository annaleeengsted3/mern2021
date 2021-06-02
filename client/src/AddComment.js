import React, { useState } from 'react';
import AuthService from "./AuthService";

export default function AddComment(props) {
    const id= props._id;
    const authService = new AuthService(`${props.api_url}/users/authenticate`);
    const [comment, setComment] = useState("");
    const [hasAdded, setAdded] = useState(false);
    let isLoggedIn = false;
    let username = "Anonymous"; //failsafe just in case
  if(authService.loggedIn()){
    isLoggedIn=true;
    username = authService.getUsername();
  }

  let addedPart = <p></p>;
  if(hasAdded && isLoggedIn){
    addedPart = <p>Your comment has been added!</p>
  } else if(hasAdded && !isLoggedIn){
    addedPart = <p>Please login to comment</p>
  }

  return (
    <section className="ask">
    <h3>Comment!</h3>
    <form>
    <input type="text" placeholder="Write your comment here" size="30"
        onChange={
          (event) => {
            setComment(event.target.value)
          }
        } />
     
      {/* <button type="button" onClick={(event) => props.addComment(comment, id)}>Add Answer</button> */}
      <button type="button" onClick={function(event){ props.addComment(comment, id); props.setCount(c=>c+1); setAdded(true)} }>Add Comment</button>
     
    </form>
      {addedPart}
    </section>
  );
}