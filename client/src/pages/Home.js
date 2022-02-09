import React from 'react';
import Axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("http://localhost:3001/posts")
      .then((response) => {
        setListOfPosts(response.data);
    });
  }, []);

  const likeAPost = (postId) => {
    Axios.post("http://localhost:3001/likes",
      { PostId: postId},
      { headers: { accessToken: localStorage.getItem("accessToken") }}
    ).then((response) => {
      setListOfPosts(listOfPosts.map((post) => {
        if (post.id == postId) {
          if (response.data.liked) {
            return {...post, Likes: [...post.Likes, 0]};
          } else {
            const likeArray = post.Likes;
            likeArray.pop();
            return {...post, Likes: likeArray };
          }
        } else {
          return post;
        }
      }))
    });
  };
  
  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title">
              {value.title}
            </div>
            <div className="body" onClick={() => {navigate(`/post/${value.id}`)}}>
              {value.postText}
            </div>
            <div className="footer">
              {value.username}
              <button onClick={() => {likeAPost(value.id);}}>Like</button>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home;