import "./post.scss";
import React, { useContext, useEffect, useState } from 'react';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { Link } from 'react-router-dom';
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/auth/authContext";
import { Alert } from "@mui/material";
import Comments from "../comments/Comments";

const Post = ({ post }) => {

  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentLength, setCommentLength] = useState(null);


  // Get likes
  const { error, data } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makeRequest.get("/likes?postId=" + post.id).then((res) => {
      return res.data;
    })
  });

  // Post & delete likes
  const mutation = useMutation({
    mutationFn: (liked) => {
      if (liked) return makeRequest.delete("/likes?postId=" + post.id);
      return makeRequest.post("/likes", { postId: post.id });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["likes"]);
    }
  });

  // Like button function
  const handleLike = async (e) => {
    e.preventDefault();
    mutation.mutate(data?.includes(currentUser.id));
  }
  
  // Delete post function
  const mutationDelete = useMutation({
    mutationFn: async (ownPost) => {
      if (!ownPost) return alert("Ooops!! You can delete only your post!");
      await makeRequest.delete("/posts?postId=" + post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  })

  // Delete post button
  const handleDelete = (e) => {
    e.preventDefault();
    mutationDelete.mutate(post.userId === currentUser.id);
    setMenuOpen(!menuOpen);
  };

 

  useEffect(() => {
    const getCommentLength = async () => {
      const res = await makeRequest.get("/comments?postId=" + post.id);
      const length = parseInt(res.data.length);
      const setLength = () => {
        setCommentLength(length);
      }
      setLength();
    }
    getCommentLength();
  }, [])

  return (
    <div className='post'>
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: 'inherit' }}>
                <span className='name'>{post.name}</span>
              </Link>
              <span className='date'>{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizOutlinedIcon onClick={() => setMenuOpen(!menuOpen)} />
          {menuOpen &&
            <div className="menu">
              <span onClick={handleDelete}>Delete</span>
            </div>
          }

        </div>
        <div className="content" key={post.id}>
          <p>{post.desc}</p>
          <img src={"/upload/" + post?.img} alt="" />
        </div>

        <div className="likeDetails">
          {data?.length !== 0
            ? data?.includes(currentUser.id) && (data?.length - 1) !== 0
              ? <span className="span">You and {data?.length - 1} other liked this</span>
              : data?.includes(currentUser.id) && (data?.length - 1) === 0
                ? <span className="span">You liked this</span>
                : <span className="span">{data?.length} people liked this</span>
            : null
          }
        </div>

        <hr />

        <div className="info">
          <div className="item">
            {data?.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{ color: "red" }} onClick={handleLike} /> : <FavoriteBorderOutlinedIcon onClick={handleLike} />}
            {data?.length
              ? data.length === 0
                ? "like"
                : data.length === 1
                  ? data.length + " " + "like"
                  : data.length + " " + "likes"
              : "like"
            }
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            {commentLength === 0
              ? "comment"
              : commentLength === 1
                ? commentLength + " comment"
                : commentLength + " comments"
            }
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  )
}

export default Post
