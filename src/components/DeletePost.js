import React from "react"
import { callApi } from "../api"
import { useHistory } from "react-router-dom"
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const DeletePost = (props) => {
    const history = useHistory()
    const postId = props.postId
    const setLoadedPosts = props.setLoadedPosts
    const loadedPosts = props.loadedPosts
    const setPostsToDisplay = props.setPostsToDisplay
    const handleDelete = async () => {
        // console.log(postId)
        history.push("/posts")
        const data = await callApi({ url: `/posts/${postId}`, method: "delete", token: localStorage.getItem("myToken") })
        if (data.success) {
            const newPosts = loadedPosts.filter((post) => post._id !== postId)
            setLoadedPosts(newPosts)
            setPostsToDisplay(newPosts)
            document.getElementsByClassName("hidden")[0].className = "visible"
            document.getElementById("float").innerText = `Post has been deleted`
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
            }, 3500)
        }

    }
    return (
        <div id="deletepost">
            <Button sx={{ mb: .5 }} variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={handleDelete}>Delete Post</Button>
        </div>

    )
}



export default DeletePost