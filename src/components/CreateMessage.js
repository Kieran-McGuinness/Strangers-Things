import { useState } from "react"
import { callApi } from "../api"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateMessage = (props) => {
    const postId = props.postId
    const [message, setMessage] = useState("")
    const handleMessageSubmit = async (event) => {
        event.preventDefault()
        if (message === "") {
            document.getElementById("float").className = "visible";
            document.getElementById("float").innerText = "Message Cannot Be Blank"
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
            }, 3500)
            setMessage("")
            setClicked(false)
        } else {
            let messageInfo = {
                message: {
                    content: `${message}`
                }
            }
            // console.log(message)
            // console.log(postId)
            const data = await callApi({ url: `/posts/${postId}/messages`, method: "post", token: localStorage.getItem("myToken"), body: messageInfo })
            setMessage("")
            setClicked(false)
            if (data.success) {
                document.getElementById("float").className = "visible"
                document.getElementById("float").innerText = "Message Sent"
                setTimeout(function () {
                    document.getElementById("float").className = "hidden";
                }, 5000)
            }
        }
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value)
    }
    const [clicked, setClicked] = useState(false)
    const displayMessageForm = () => {
        // console.log("clicked")
        setClicked(true)


    }
    return (
        clicked ?
            <Box component="form" sx={{
                '& .MuiTextField-root': { mt: .5, width: '25ch' }
            }} noValidate autoComplete="off" onSubmit={handleMessageSubmit}>
                <TextField
                    required id="createmessage"
                    multiline value={message}
                    onChange={handleMessageChange}
                    label="Message:"
                />
                <Button sx={{
                    display: "flex"
                }}
                    size="small"
                    variant="contained"
                    color="primary"
                    type="submit">Send Message</Button>

            </Box>
            :
            <Button sx={{ m: .5 }} onClick={displayMessageForm} size="small" variant="contained" color="primary" type="submit">Send a Message</Button>
    )
}


export default CreateMessage