import {useEffect, useState} from "react";
import { Router } from "@reach/router";
import Posts from "./Posts"
import Post from "./Post"
import AddPost from "./AddPost"
import Login from "./Login"
import CreateNewUser from "./CreateNewUser"
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
  // if(authService.loggedIn){
  //   setLoggedIn(true);
  // }


  let username = "Anonymous";
  const [updatedUser, setUpdatedUser] = useState(username);

  
  useEffect(() => {
    const fetchData = async () => {
      //fetch topics
      const topicsresponse = await authService.fetch(`${API_URL}/posts/topics`);
      const topicsdata = await topicsresponse.json();
      setTopics(topicsdata);
      //fetch posts
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
        console.error('Add post error:', error);
      });

      setPostCount(postCount+1);
      }

      useEffect(() => {

if(isLoggedIn){
  setUpdatedUser(authService.getUsername());
  setBtnTxt("Log out");
}else{
  setUpdatedUser("Anonymous");
  setBtnTxt("Log out");
}


      }, [isLoggedIn]); 


    async function login(username, password) {
      try {
        const resp = await authService.login(username, password);
       console.log("Authentication:", resp.msg); 
        setLoggedIn(true);
      } catch (e) {
        console.log("Login", e);

      }
    }

  
  

    let topicsMenu = <p>{topics[0]}</p>;
    if (topics.length > 0) {
      topicsMenu =< ol><li key={1}><Link to={`/`}>All Posts</Link></li>{topics.map(topic => <li key={topic._id}><Link to={`/topic/${topic.title}`}>{topic.title}</Link></li>)}</ol>;
    }
   
    let loginModule = <Link to={`/login`}>Login Here, {username}!</Link>
    if (authService.loggedIn()) {
username= authService.getUsername()
     loginModule = <div>Logged in as {username}. <button type="button" onClick={function(event){ logout();}}>{btnTxt}</button></div>;
  
    } 

    function logout() {
      authService.logout();
      setLoggedIn(false);
      // TO DO, BUG TEST THIS- not 100% air-tight in terms of UI
  }



  return (
    <>
      <h1>Annalee's Post App</h1>
      <div className="login">{loginModule}</div>
      {topicsMenu}
        <Link to={`/add_post`}>Add Post</Link>
      <Router>
      <Login path="/login" login={login} url={API_URL} ></Login>
      <CreateNewUser path="/newuser" url={API_URL} ></CreateNewUser>
          <Posts path="/" posts={posts} url={url} getPost={getPost} setPosts={setPosts} authService={authService}> </Posts>
          <Posts path="/topic/:topic" posts={posts} url={url} getPost={getPost} setPosts={setPosts} authService={authService}> </Posts>
          <AddPost path="/add_post" addPost={addPost} topics= {topics} url={API_URL}></AddPost>
      <Post path="/:_id" getPost={getPost} url={url} apiurl={API_URL}></Post>
    
        </Router> 
       
      
    </>
  );
}

export default App;
