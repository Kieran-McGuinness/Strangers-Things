import { useState } from "react"
import { callApi } from "../api"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const CreatePost = (props) => {
    const loadedPosts = props.loadedPosts
    const setLoadedPosts = props.setLoadedPosts
    const setPostsToDisplay = props.setPostsToDisplay
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [title, setTitle] = useState("")
    const [willDeliver, setWillDeliver] = useState(false)

    const goToTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    const handleSubmitNewPost = async (event) => {
        if (title && description && location && price && title) {
            event.preventDefault()
            let postInfo = {
                post: {
                    title: `${title}`,
                    description: `${description}`,
                    price: `${price}`,
                    location: `${location}`,
                    willDeliver: `${willDeliver}`
                }
            }
            setTitle("")
            setDescription("")
            setPrice("")
            setLocation("")
            setWillDeliver(false)
            const data = await callApi({ url: "/posts", method: "POST", token: localStorage.getItem("myToken"), body: postInfo })
            if (data.success) {
                document.getElementsByClassName("hidden")[0].className = "visible"
                document.getElementById("float").innerText = `Post has been created`
                setTimeout(function () {
                    document.getElementById("float").className = "hidden";
                }, 5000)
            } else if (!data.success) {
                document.getElementsByClassName("hidden")[0].className = "visible"
                document.getElementById("float").innerText = `${data.message}`
                setTimeout(function () {
                    document.getElementById("float").className = "hidden";
                }, 3500)
            }
            setPostsToDisplay([data.data.post, ...loadedPosts])
            setLoadedPosts([data.data.post, ...loadedPosts])
        } else {
            event.preventDefault()
        }
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleLocationChange = (event) => {
        setLocation(event.target.value)
    }
    const handlePriceChange = (event) => {
        setPrice(event.target.value)
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleWillDeliverChange = (event) => {
        setWillDeliver(event.target.checked)
    }



    return (
        localStorage.getItem("myToken") ?
            <aside id="createpost">
                <h1 id="createposttitle">Create Post</h1>
                <Box component="form" noValidate autoComplete="off" id="createpostform" onSubmit={handleSubmitNewPost}>
                    <TextField
                        required
                        id="createdescription"
                        label="Description"
                        value={description}
                        variant="standard"
                        onChange={handleDescriptionChange}
                    />
                    <TextField
                        required
                        id="createlocation"
                        label="Location:"
                        value={location}
                        variant="standard"
                        onChange={handleLocationChange}
                    />
                    <TextField
                        required
                        id="createprice"
                        label="Price:"
                        value={price}
                        variant="standard"
                        onChange={handlePriceChange}
                    />
                    <TextField
                        required
                        id="createtitle"
                        label="Title"
                        value={title}
                        variant="standard"
                        onChange={handleTitleChange}
                    />
                    <FormControlLabel control={<Checkbox value={willDeliver} onChange={handleWillDeliverChange} />} label="Will Deliver" />
                    <Button id="submitcreatepostbtn" sx={{ mb: 2 }} variant="contained" color="primary" size="small" type="submit">Submit Post</Button>
                </Box>
                <Button id="gototop" sx={{ mb: 2 }} variant="contained" color="success" size="small" type="submit" onClick={goToTop}>Top of Page</Button>

            </aside> :
            <></>
    )
}



export default CreatePost