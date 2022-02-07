import { useState } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import DeletePost from './DeletePost';
import { EditPost } from ".";
import { Button } from "@mui/material"
import Divider from '@mui/material/Divider';

const ViewPost = (props) => {
  const { id } = useParams()
  const setPostsToDisplay = props.setPostsToDisplay
  const loadedPosts = props.loadedPosts
  const setLoadedPosts = props.setLoadedPosts
  function postView(post, term) {
    return post._id.includes(term)
  }
  const indPost = loadedPosts.filter(post => postView(post, id))
  // console.log(loadedPosts)
  return (
    indPost.length ? <div key={indPost[0]._id} id='profileindvpostspage'>
      <div className="profileindvposts">
        <h2>{indPost[0].title}</h2>
        <h3>{indPost[0].author.username}</h3>
        <p><span className="category">Posted on: </span>{indPost[0].createdAt}</p>
        <p><span className="category">Price: </span>{indPost[0].price}</p>
        <p><span className="category">Description: </span>{indPost[0].description}</p>
        <p><span className="category">Location: </span>{indPost[0].location}</p>
        <p><span className="category">Will Deliver: </span>{JSON.stringify(indPost[0].willDeliver)}</p>
      </div>
      <Divider sx={{ borderBottomWidth: 3 }} component="li" />
      {(() => {
        if (indPost[0].isAuthor && (indPost[0].messages.length)) {
          return (
            <div className="messages">
              <h3>Messages:</h3>
              {indPost[0].messages.map((messages, index) => <div
                key={"message" + messages.post._id + index} className="profilemessages">
                <p><span className="category"> From: </span>{messages.fromUser.username}</p>
                <p>{messages.content}</p>
                <Divider variant="middle" component="li" />
              </div>
              )}
            </div>
          )
        } else {
          return (
            <>
              <h3>No Messages</h3>
            </>
          )
        }
      })()}
      <div id="indvposticons">
        {indPost[0].isAuthor ? <EditPost id={id} indPost={indPost} /> : <p></p>}
        {indPost[0].isAuthor ? <DeletePost postId={indPost[0]._id} setLoadedPosts={setLoadedPosts}
          loadedPosts={loadedPosts} setPostsToDisplay={setPostsToDisplay} /> : <></>}
        <Link id="viewallposts" to="/posts">
          <Button size="small" variant="contained" color="secondary" type="submit">Return to All Posts</Button>
        </Link>
      </div>
    </div>
      :
      <div>
        <h2>Post Cannot Be Loaded</h2>
        <Link id="viewallposts" to="/posts">
          <Button size="small" variant="contained" color="secondary" type="submit">Return to All Posts</Button>
        </Link>
      </div>
  )
}

export default ViewPost