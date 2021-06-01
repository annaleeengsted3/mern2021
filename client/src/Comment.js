import React, { useState, useEffect } from 'react';
export default function Comment(props){
  let comment= props.comment;
  const post = props.post;
 // const [votes, setVote] = useState(props.answer.votes)
  // useEffect(() => {
  //     // if(votes!= 0){
  //     //     const updatedWithVotes ={
  //     //         answer: comment.answer,
  //     //         _id: post._id,
  //     //         votes: votes
  //     //     }
  //       fetch(`${props.url}/${post._id}`, {
  //           method: 'POST', 
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify(updatedWithVotes),
  //         })
  //         .then(response => console.log(response.json()))
  //         .then(data => {
  //           //console.log("data: " + data);
  //         })
  //         .catch((error) => {
  //           console.error('Error:', error);
  //         });

      
  // });


  if (comment === undefined) {
    return <p>Nothing here</p>;
  } else return (
        <>
   
           <p>{comment.author + ", " + comment.date}: "{comment.comment}"</p>
           {/* <p><button type="button" onClick={() => setVote(votes + 1)}>▲ Upvote</button><span className="italic votes">{votes}</span></p> */}
</>
      );
    }
