import React, { useEffect } from 'react';
import { CreateMessage, CreatePost, IndividualPost } from '.';
import { callApi } from '../api';
import Search from './Search';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail'
import { Divider } from '@mui/material';

const Posts = (props) => {
  const postsToDisplay = props.postsToDisplay
  const setPostsToDisplay = props.setPostsToDisplay
  const loadedPosts = props.loadedPosts
  const setLoadedPosts = props.setLoadedPosts


  useEffect(() => {
    // calls to api for all posts, if token exists uses it in api call, loads the posts onto the page
    callApi({ url: "/posts", token: localStorage.getItem("myToken") }).then(result => {
      setLoadedPosts(result.data.posts)
      setPostsToDisplay(result.data.posts)
      // console.log(result)
    }).catch(error => {
      console.error(error)
    })
  }, []);



  return (
    <div id="postspage">
      <div id="postsandcreate">
        {/* generates the createpost page, if the user is not autheticated the compoent only generates <></> */}
        <CreatePost setLoadedPosts={setLoadedPosts} loadedPosts={loadedPosts} setPostsToDisplay={setPostsToDisplay} />
        {/* maps through the posts */}
        <div id="posts">
          <h1 id="poststitle">Posts</h1>
          {/* loads the search bar */}
          <Search loadedPosts={loadedPosts} setPostsToDisplay={setPostsToDisplay} />
          {/* maps through the posts and puts them all on the page */}
          {postsToDisplay.map((item, index) =>
            <div key={item._id} className='indvPosts'>
              <h2>{item.title}</h2>
              <h3>Posted by: {item.author.username}</h3>
              <p>Posted on: {item.createdAt}</p>
              <p>Price: {item.price}</p>
              <p>Description: {item.description}</p>
              <p>Location: {item.location}</p>
              <p>Will Deliver: {JSON.stringify(item.willDeliver)}</p>

              {(() => {
                if (item.isAuthor && (item.messages.length)) {
                  return (
                    <>
                      {/* if current authenticated user is the author and the post has messages puts message icon with message count */}
                      <Badge sx={{ mt: 1.2 }} badgeContent={item.messages.length} color="primary">
                        <MailIcon color="action" />
                      </Badge>

                    </>
                  )

                } else {
                  return (
                    <>

                    </>
                  )
                }
              })()}
              {/* if current user is author loads the individual post button */}
              {item.isAuthor ? <IndividualPost loadedPosts={loadedPosts} postId={item._id} index={index} setPostsToDisplay={setPostsToDisplay} /> : <></>}
              {(() => {
                // if user is logged in and not the author places the send message component on the post
                if (localStorage.getItem("myToken") && !(item.isAuthor)) {
                  return (
                    <>
                      <CreateMessage postId={item._id} />
                      <Divider sx={{ borderBottomWidth: 2 }} component="li" />
                    </>
                  )
                } else {
                  return (
                    <><Divider sx={{ borderBottomWidth: 2 }} component="li" /></>
                  )
                }
              })()}
            </div>
          )}
        </div>
      </div>
    </div>


  )

}

export default Posts