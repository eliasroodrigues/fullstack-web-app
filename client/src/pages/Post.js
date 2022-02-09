import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

import { AuthContext } from '../helpers/AuthContext';

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [listOfComments, setListOfComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    Axios.get(`http://localhost:3001/posts/byId/${id}`)
      .then((response) => {
        setPostObject(response.data);
    });

    Axios.get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
        setListOfComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    Axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setListOfComments([...listOfComments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    Axios.delete(`http://localhost:3001/comments/${id}`, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    })
      .then(() => {
        setListOfComments(listOfComments.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>

      <div className="rightSide">
        <div className="addCommentContainer">
          <input type="text" placeholder="Comment here..." value={newComment}
            onChange={(event) => {setNewComment(event.target.value)}}
          />
          <button onClick={addComment}>Comment</button>
        </div>
        <div className="listOfComments">
          {listOfComments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label>{comment.username}</label>
                {comment.commentBody}
                {authState.username === comment.username &&
                  <button onClick={() => {deleteComment(comment.id)}}>X</button>
                }
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Post;