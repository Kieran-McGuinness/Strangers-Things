import React, { useEffect, useState } from "react";
import { callApi } from "../api";
import Divider from '@mui/material/Divider';

const Profile = (props) => {
  const [myProfile, setMyProfile] = useState([])

  useEffect(() => {
    // calls the api for the current authenticated users posts and messages
    callApi({ url: "/users/me", token: localStorage.getItem("myToken") }).then(result => {
      setMyProfile(result.data)
      // console.log(result.data)
    }).catch(error => {
      console.error(error)
    })
  }, []);
  return (
    <div id="profile">
      {/* maps through the current users information putting each active post then its messages */}
      <h1 id="profiletitle">Profile</h1>
      <div>
        <h3 id="profileheader">My Posts</h3>
        {myProfile.posts ? myProfile.posts.map(post =>
          post.active ?
            <div className="profileposts" key={"post" + post._id}>
              <p><span className="category">Post Title:</span>{post.title}</p>
              <p><span className="category">Post Description:</span>{post.description}</p>
              <Divider sx={{ borderBottomWidth: 3 }} component="li" />
              {post.messages.map((messages, index) =>
                <div className="profilemessages" key={index + 1}>
                  <p><span className="category">Message </span>{index + 1}</p>
                  <p><span className="category">From:</span>{messages.fromUser.username}</p>
                  <p>{messages.content}</p>
                  <Divider variant="middle" component="li" />
                </div>)}
            </div> :
            <React.Fragment key={post._id + .5}></React.Fragment>) :
          // if user has no posts 
          <p>no posts</p>}
      </div>
    </div>
  )
}


export default Profile