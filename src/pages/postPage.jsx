import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "../components/common/navigation";
import { Footer } from "../components/common/footer";
import { api } from '../config.js';
import http from '../services/httpService';
import CreatePostPage from "../components/discussionForum/createPost.jsx";
import jwtDecode from "jwt-decode";

const PostPage = (props) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const jwt = localStorage.getItem("token");
        if (jwt) {
          const user_jwt = jwtDecode(jwt);
          const { data } = await http.get(`${api.usersEndPoint}${user_jwt._id}`);
          console.log(data);
          localStorage.setItem('user',JSON.stringify(data));
          setUser(data);
        }
      } catch (ex) {
        console.error("Error fetching user data", ex);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <Navigation />
      <div style={{ marginTop: '50px', padding: '50px' }}> 
        <CreatePostPage id={id} user={user} />
      </div>
      <Footer data={props.data.Contact} />
    </div>
  );
};

export default PostPage;
