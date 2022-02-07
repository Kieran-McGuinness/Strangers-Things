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
        <CreatePost setLoadedPosts={setLoadedPosts} loadedPosts={loadedPosts} setPostsToDisplay={setPostsToDisplay} />

        <div id="posts">
          <h1 id="poststitle">Posts</h1>
          <Search loadedPosts={loadedPosts} setPostsToDisplay={setPostsToDisplay} />
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
              {item.isAuthor ? <IndividualPost loadedPosts={loadedPosts} postId={item._id} index={index} setPostsToDisplay={setPostsToDisplay} /> : <></>}
              {(() => {
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