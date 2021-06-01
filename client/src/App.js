import {useEffect, useState} from "react";
import { Router } from "@reach/router";
import Posts from "./Posts"
import Post from "./Post"
import AddPost from "./AddPost"
import Login from "./Login"
import AuthService from "./AuthService";
import { Link } from "@reach/router";


const API_URL = process.env.REACT_APP_API;
const authService = new AuthService(`${API_URL}/users/authenticate`);

function App() {
  const url = `${API_URL}/posts`
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [btnTxt, setBtnTxt] = useState("Log out");
  const [isLoggedIn, setLoggedIn] = useState(false);
  let username = "Anonymous";

  
  useEffect(() => {
    const fetchData = async () => {
 console.log("fetch");
 const topicsresponse = await authService.fetch(`${API_URL}/posts/topics`);
 const topicsdata = await topicsresponse.json();
 setTopics(topicsdata);


      const response = await authService.fetch(url);
      const data = await response.json();
      setPosts(data);
     
    };
    fetchData();
  }, [postCount]); 

  function getPost(id){
    return posts.find(post => post._id == id)
    }

    function addPost(input, event) { 
      //console.log(input) ;    
        fetch(url, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authService.getToken()}`
        },
        body: JSON.stringify(input),
      })
      .then(response => console.log(response.json()))
      .then(data => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      setPostCount(postCount+1);
      }

      // useEffect(() => {
      //   document.title = `${username} logged in`;
      // }); 




    async function login(username, password) {
      try {
        const resp = await authService.login(username, password);
        console.log("Authentication:", resp.msg);
        //setPostCount(p => p + 1);
        //setUsername(username);
        setLoggedIn(true);
      } catch (e) {
        console.log("Login", e);
      }
    }

  

    let topicsMenu = <p>{topics[0]}</p>;
    if (topics.length > 0) {
      topicsMenu =< ol><li><Link to={`/`}>All Posts</Link></li>{topics.map(topic => <li><Link key={topic.id} to={`/topic/${topic.title}`}>{topic.title}</Link></li>)}</ol>;
    }
   
    let loginModule = <Link to={`/login`}>Login Here, {username}!</Link>
    if (authService.loggedIn()) {
      username = authService.getUsername();
      loginModule = <div>Logged in as {username}. <button type="button" onClick={function(event){ logout();}}>{btnTxt}</button></div>;
    } else{
      username= "Anonymous";
    }

    function logout() {
      authService.logout();
      setBtnTxt("Logged out")
      console.log("logout");
      // TO DO, BUG TEST THIS- not 100% air-tight
  }

  return (
    <>
      <h1>Deddit</h1>
      
      {/* <Link to={`/login`}>Login Here</Link> */}
      <div className="login">{loginModule}</div>
      {topicsMenu}
        <Link to={`/add_post`}>Add Post</Link>
      <Router>
      <Login path="/login" login={login} url={API_URL} ></Login>
          <Posts path="/" posts={posts} url={url} getPost={getPost} setPosts={setPosts}> </Posts>
          <Posts path="/topic/:topic" posts={posts} url={url} getPost={getPost} setPosts={setPosts}> </Posts>
       
      
          <AddPost path="/add_post" addPost={addPost} topics= {topics} url={API_URL}></AddPost>
      <Post path="/:_id" getPost={getPost} url={url} apiurl={API_URL}></Post>
    
        </Router> 
       
      
    </>
  );
}

export default App;
