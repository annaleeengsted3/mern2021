import React, { useState} from 'react';
export default function Comment(props){
  let comment= props.comment;
  const post = props.post;
 const [votes, setVote] = useState(props.comment.votes)
 const [button, setButton] = useState("▲ Upvote")



  function updateComment(){
    
    console.log(votes);
    if(props.authService.loggedIn()){
        const updatedWithVotes ={
            comment: comment.comment,
            _postid: post._id,
            votes: votes+1,
            author: comment.author,
            date: comment.date
        }
        console.log(updatedWithVotes.votes);
      fetch(`${props.url}/comment/${post._id}`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${props.authService.getToken()}`
          },
          body: JSON.stringify(updatedWithVotes),
        })
        .then(response => console.log(response.json()))
        .then(data => {
          console.log("data: " + data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      } else{
        console.log("called useeffect but votes is zero");
      }


  }



  if (comment === undefined) {
    return <p>Nothing here</p>;
  } else return (
        <>
           <p>{comment.author + ", " + comment.date}: "{comment.comment}"</p>
           <p><button type="button" onClick={function(event){ if(props.authService.loggedIn()){setVote(votes+1); updateComment();}else{setButton("Please login to vote")}}}>{button}</button><span className="italic votes">{votes}</span></p>
</>
      );
    }