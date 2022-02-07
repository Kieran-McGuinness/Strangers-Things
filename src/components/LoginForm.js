import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { callApi } from "../api"
import Button from '@mui/material/Button';
import { buttonBaseClasses, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";


const LoginForm = (props) => {
    let history = useHistory()
    const [loginMessage, setLoginMessage] = useState([])
    const setCurrentAuthToken = props.setCurrentAuthToken
    const authToken = props.authToken
    const setAuthToken = props.setAuthToken
    // checks if there is a token currently in local Storage, if so saves it to states
    useEffect(() => {
        localStorage.getItem("myToken")
            ?
            setCurrentAuthToken(localStorage.getItem("myToken"))
            :
            setAuthToken(null)
    }, [])


    const handleLogOut = (event) => {
        // clears local storage to remove key and log user out
        event.preventDefault()
        localStorage.removeItem("myToken")
        setCurrentAuthToken("")
        setAuthToken(null)
    }


    const handleSubmit = async (event) => {
        // takes entered password and username and send to callApi, if succesfull creates a notification, if unsucessful creates notification with the message and redirects page to posts
        let loginInfo = {
            user: {
                username: `${username}`,
                password: `${password}`
            }
        }
        event.preventDefault()
        const results = await callApi({ url: "/users/login", method: "POST", body: loginInfo })
        setLoginMessage(results.data)
        setPassword("")
        setUsername("")
        // console.log(results)
        if (results.success) {
            localStorage.setItem("myToken", results.data.token)
            setCurrentAuthToken(localStorage.getItem("myToken"))
            document.getElementsByClassName("hidden")[0].className = "visible"
            document.getElementById("float").innerText = `${results.data.message} You will be redirected shortly.`
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
                history.push("/posts");
            }, 3000)
            setAuthToken(true)
        } else {
            document.getElementsByClassName("hidden")[0].className = "visible"
            document.getElementById("float").innerText = `${results.message}`
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
            }, 4000)
        }
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }



    return (
        // if authentication token already exists displays you are currently logged in and a log out button, if no token is in local storage displays the login form
        authToken ?
            <div id="loggedin">
                <p>{loginMessage ? "You are currently logged in" : ""}</p>
                <p>{localStorage.getItem("myToken") ? "To log out please click below" : ""}</p>
                <Button onClick={handleLogOut} variant="contained" color="primary" type="submit" size="small">Log Out</Button>
            </div>
            :
            <div id="login">
                <h1>Please login or register below</h1>
                <Box component="form" noValidate autoComplete="off" id="loginform" onSubmit={handleSubmit}>
                    <TextField required id="loginusername" label="Username:" value={username} variant="standard" onChange={handleUsernameChange} />
                    <TextField required id="loginpassword" label="Password:" value={password} variant="standard" type="password" onChange={handlePasswordChange} />
                    <Button variant="contained" color="primary" type="submit" sx={{ mt: .5 }}>Submit</Button>
                    <Link to="/register">Need to register?</Link>
                </Box>

            </div>

    )
}




export default LoginForm


