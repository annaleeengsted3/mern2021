import React from 'react';
import { Link } from "@reach/router";


export default function Posts(props){
    let shownPosts = props.posts
    if(props.topic == undefined){
      shownPosts= props.posts.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });
  } else{
    shownPosts= filterPosts(props.topic).sort(function(a,b){
      return new Date(b.date) - new Date(a.date);
    });;
  }
    let url = props.url


    function filterPosts(i){
      return props.posts.filter(post => {
         if (post.topic == i) {
          return true;
         } else {
           return false;
         }
       });
 
       }

        return (
            <>
              <section className="questions">
                {shownPosts.slice(0,15).map((post, index) =>
                  <article key={index}>
                   <h4> <Link to={`/${post._id}`}>{post.title}</Link></h4>
                   <div>
                       <p><span className="italic">Topic: {post.topic}</span></p>
                       <p><span className="italic">Author: {post.author}</span></p>
                       <p><span className="italic">Date: {post.date.toString()}</span></p>
                   </div>
                  </article>)}
              </section>
              </>
          );
    


}