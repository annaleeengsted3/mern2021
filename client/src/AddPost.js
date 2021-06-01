import React, { useState, useEffect } from 'react';
import { Link } from "@reach/router";
import AuthService from "./AuthService";

export default function AddPost(props) {
  let topics = props.topics;
  const authService = new AuthService(`${props.url}/users/authenticate`);
  let isLoggedIn = false;
  if(authService.loggedIn()){
    isLoggedIn=true;
  }
const [input, setInput] = useState({title:"", topic: "TV", author: "", date: new Date(Date.now()), comments: [], votes: 0});
 const [hasAdded, setAdded] = useState(false);


function handleInputChange(event){
  const target = event.target;
    const value = target.value;
    const name = target.name;
setInput({
  ...input,
  [name]: value
  })
 
}

let addedPart = <p></p>;
//  useEffect(() => {
//   // checkLoggedStatus();
//   document.title = `${hasAdded} logged in`;
//   if(props.isLoggedIn){
//     addedPart = <p>Your post has been added!</p>
//   } else if(!props.isLoggedIn){
//     addedPart = <p>Please login to post</p>
//   }

//       }, [hasAdded]); 


  if(hasAdded && isLoggedIn){
    addedPart = <p>Your post has been added!</p>
  } else if(hasAdded && !isLoggedIn){
    addedPart = <p>Please login to post</p>
  }


// if(hasAdded){
//   addedPart = <p>Your post has been added!</p>
// }
  return (
    <section className="ask">
    <h3>Create a post for the forum!</h3>
    <form>
        
  <label>Title: </label> <input name="title" type="text" placeholder="Your post..." size="130" onChange={(event)=> handleInputChange(event)}   />
<br></br>
     <label>Topic: </label> <select onChange={(event)=> handleInputChange(event)} name="topic" >
{topics.map(topic => <option key={topic.id} value={`${topic.title}`}>{topic.title}</option>)}

     </select>
       <br></br>
     
      <button type="button" onClick={function(event){ props.addPost(input, event); setAdded(true)}}>Add Post</button>
      
      {addedPart}
      
    </form>
      
    <button><Link to="/">Back</Link></button>
    </section>
  );
}