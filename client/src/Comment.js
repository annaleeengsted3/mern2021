import React, { useState, useEffect } from 'react';
export default function Comment(props){
  let comment= props.comment;
  const post = props.post;
 const [votes, setVote] = useState(props.comment.votes)
 const [button, setButton] = useState("▲ Upvote")

  useEffect(() => {
      if(votes!= 0 && props.authService.loggedIn()){
          const updatedWithVotes ={
              comment: comment.comment,
              _id: post._id,
              votes: votes,
              author: comment.author,
              date: comment.date
          }
        fetch(`${props.url}/${post._id}`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${props.authService.getToken()}`
            },
            body: JSON.stringify(updatedWithVotes),
          })
          .then(response => console.log(response.json()))
          .then(data => {
            //console.log("data: " + data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });

        } else{

        }
  });



  if (comment === undefined) {
    return <p>Nothing here</p>;
  } else return (
        <>
           <p>{comment.author + ", " + comment.date}: "{comment.comment}"</p>
           <p><button type="button" onClick={function(event){ if(props.authService.loggedIn()){setVote(votes + 1)}else{setButton("Please login to vote")}}}>{button}</button><span className="italic votes">{votes}</span></p>
</>
      );
    }
