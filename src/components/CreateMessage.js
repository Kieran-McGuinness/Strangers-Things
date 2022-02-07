import { useState } from "react"
import { callApi } from "../api"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreateMessage = (props) => {
    const postId = props.postId
    const [message, setMessage] = useState("")
    const handleMessageSubmit = async (event) => {
        // handles submitting a message, checks if message field is blank, if so will return an error message and not run command.
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
            // if message is not blank will put it into an object and send it along with method, authentication token and url to fetch command
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
                // if fetch command is succesful will create a notifiction on the page
                document.getElementById("float").className = "visible"
                document.getElementById("float").innerText = "Message Sent"
                setTimeout(function () {
                    document.getElementById("float").className = "hidden";
                }, 3500)
            }
        }
    }

    const handleMessageChange = (event) => {
        // handles updating message value as it is entered
        setMessage(event.target.value)
    }
    // tracks wheter send message button is clicked
    const [clicked, setClicked] = useState(false)

    const displayMessageForm = () => {
        // changes clicked state to true when button is clicked
        // console.log("clicked")
        setClicked(true)


    }
    return (
        // generates send message button if button has not been clicked, when button is clicked generates the send message form and button to trigger api fetch command
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