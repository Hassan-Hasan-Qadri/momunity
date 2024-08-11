import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Moment from "react-moment";
import "moment-timezone";
import { PersonCircle, HandThumbsUpFill } from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import http from "../../services/httpService";
import { api } from "../../config.js";
import PostReply from "./createReply";

const PostPage = ({ user }) => {
  const [post, setPost] = useState({
    description: "",
    title: "",
    tags: [],
    author: [],
    upvotes: [],
    views: 0,
  });

  const [replies, setReplies] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: post } = await http.get(api.postsEndPoint + id);
      const { data: replies } = await http.get(api.repliesEndPoint + id);
      setPost(post);
      setReplies(replies);
    };
    fetchData();
  }, [id]);

  const checkLike = () => {
    if (user && post.upvotes && post.upvotes.includes(user._id)) return true;
    return false;
  };

  const checkReplyLike = (replyId) => {
    if (user) {
      for (let reply of replies) {
        if (reply._id === replyId && reply.upvotes.includes(user._id)) return true;
      }
    }
    return false;
  };

  const handleUpvote = async () => {
    try {
      const { data: updatedPost } = await http.put(
        api.postEndPoint + "like/" + id,
        {}
      );
      setPost(updatedPost[0]);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("You can't upvote your own post!");
      }
    }
  };

  const handleReplyUpvote = async (replyId) => {
    try {
      await http.put(api.repliesEndPoint + "like/" + replyId, {});
      const { data: updatedReplies } = await http.get(api.repliesEndPoint + "/" + id);
      setReplies(updatedReplies);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("You can't upvote your own reply!");
      }
    }
  };

  return (
    <div className="post-manager-container">
      <ToastContainer />
      <div className="post-container">
        <h2>{post.title}</h2>
        <p className="mt-4 post-container-border" style={{ color: "#505050" }}>
          {post.description}
        </p>
        <div className="mt-1">
          <div className="align-post-info">
            <button
              disabled={!user}
              className={checkLike() ? "btn btn-primary" : "btn btn-outline-primary"}
              onClick={handleUpvote}
            >
              <HandThumbsUpFill className="mr-2" />
              {(post.upvotes && post.upvotes.length) || 0}
            </button>
            <p>{post.views} Views</p>
          </div>
          <br/>
          <div className="align-post-info" style={{ color: "#505050" }}>
            <div className="align-post-info user-detail">
              <PersonCircle size={30} className="mr-2" />
              Posted by {(post.author && post.author.username) || "Unknown"}
            </div>
            <p className="mb-1">
              <Moment fromNow>{post.time}</Moment>
            </p>
          </div>
          <br/>
          Related Topics:
          {post.tags &&
            post.tags.map((tag) => (
              <span key={tag._id} className="badge badge-success m-1 p-2">{tag.name}</span>
            ))}
        </div>
      </div>
      {user && <PostReply id={id} />}
      <div className="reply-numbers">
        Showing {replies.length} replies
      </div>
      <br/>
        {replies &&
          replies.map((reply) => (
            <div className="reply-container">
            <div key={reply._id} className="container col-lg-12 shadow-lg p-3 mt-3 bg-body rounded">
              <div className="ml-4 user-detail">
                <PersonCircle size={30} className="mr-3" />
               <span className="reply-username"> {reply.author.username} </span>
              </div>
              <br/>
              <div className="m-4 post-container-border">{reply.comment}</div>
              <br/>
              <div className="reply-info">
                <button
                  className={checkReplyLike(reply._id) ? "btn btn-primary" : "btn btn-outline-primary"}
                  disabled={!user}
                  onClick={() => handleReplyUpvote(reply._id)}
                >
                  <HandThumbsUpFill className="mr-2" />
                  {reply.upvotes.length}
                </button>
                <p className="mb-1">
                  <Moment fromNow style={{ color: "#505050" }}>
                    {reply.time}
                  </Moment>
                </p>
              </div>
            </div>
            </div>
          ))}
    </div>
  );
};

export default PostPage;
