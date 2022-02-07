import { useHistory } from "react-router-dom"
import { useState } from "react"
import { callApi } from "../api"
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { buttonBaseClasses } from "@mui/material";


const EditPost = (props) => {
    const history = useHistory()
    const [editClicked, setEditClicked] = useState(false)
    const id = props.id
    const indPost = props.indPost
    const [description, setDescription] = useState("")
    const [location, setLocation] = useState("")
    const [price, setPrice] = useState("")
    const [title, setTitle] = useState("")
    const [willDeliver, setWillDeliver] = useState(false)
    const clickButton = (event) => {
        // sets form values to those of post that is being edited
        setDescription(indPost[0].description)
        setLocation(indPost[0].location)
        setPrice(indPost[0].price)
        setTitle(indPost[0].title)
        setWillDeliver(indPost[0].willDeliver)
        setEditClicked(true)
    }

    const handleSubmitEdit = async (event) => {
        // creates object with edited posts and sends it with key, url and method to api
        event.preventDefault()
        let editedInfo = {
            post: {
                title: `${title}`,
                description: `${description}`,
                price: `${price}`,
                location: `${location}`,
                willDeliver: `${willDeliver}`
            }
        }
        const results = await callApi({ url: `/posts/${id}`, method: "patch", token: localStorage.getItem("myToken"), body: editedInfo })
        if (results.success) {
            // if api fetch is succesfull displays a success message and redirects to posts pages
            document.getElementsByClassName("hidden")[0].className = "visible"
            document.getElementById("float").innerText = "Post has been updated"
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
            }, 5000)
        }
        // console.log(editedInfo, id)
        // console.log(results)
        history.push("/posts")
    }

    // functions that handle form value changes
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
        // generates an edit post button, once clicked generates the edit post form and submit button
        editClicked ?
            <Box component="form" noValidate autoComplete="off" id="editpost" onSubmit={handleSubmitEdit}>
                <TextField
                    required
                    id="editdescription"
                    label="Description"
                    value={description}
                    variant="standard"
                    onChange={handleDescriptionChange}
                />
                <TextField
                    required
                    id="editlocation"
                    label="Location:"
                    value={location}
                    variant="standard"
                    onChange={handleLocationChange}
                />
                <TextField
                    required
                    id="editprice"
                    label="Price:"
                    value={price}
                    variant="standard"
                    onChange={handlePriceChange}
                />
                <TextField
                    required
                    id="edittitle"
                    label="Title"
                    value={title}
                    variant="standard"
                    onChange={handleTitleChange}
                />
                <FormControlLabel control={<Checkbox value={willDeliver} onChange={handleWillDeliverChange} />} label="Will Deliver" />
                <Button id="submiteditpostbtn" sx={{ mb: .5 }} variant="contained" color="success" size="small" type="submit">Submit Edited Post</Button>
            </Box>
            :
            <div id="editpost">
                <Button variant="contained" size="small" color="success" startIcon={<DeleteIcon />} onClick={clickButton}>Edit Post</Button>
            </div>

    )
}


export default EditPost