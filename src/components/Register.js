import { useState } from "react"
import { callApi } from "../api"
import { Box } from "@mui/system"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { useEffect } from "react"
import { useHistory } from "react-router-dom"

const Register = (props) => {
    const [passwordMatch, setPasswordMatch] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    let history = useHistory()
    useEffect(() => {
        // checks if passwords match, if not sets match state to false which shows an error
        if (password === confirmPassword) {
            setPasswordMatch(false)
        } else if (password !== confirmPassword) {
            setPasswordMatch(true)
        }
    }, [confirmPassword, password])

    const handleSubmit = async (event) => {
        // puts password and usernmae into an object to be sent to api
        event.preventDefault()
        let regInfo = {
            user: {
                username: `${username}`,
                password: `${password}`
            }
        }
        // console.log(username)
        // console.log(password)
        // console.log(confirmPassword)
        // console.log(regInfo)

        if (!passwordMatch) {
            // if passwords match sends the information to api and on success generates a message and redirects to login page
            const results = await callApi({ url: "/users/register", method: "POST", body: regInfo })
            setPassword("")
            setUsername("")
            setConfirmPassword("")
            if (results.success) {
                history.push("/login");
                document.getElementsByClassName("hidden")[0].className = "visible"
                document.getElementById("float").innerText = `${results.data.message} Please Login to Continue`
                setTimeout(function () {
                    document.getElementById("float").className = "hidden";
                }, 4000)
            }
        } else {
            // if passwords do not match creates another notification that passwords must match
            document.getElementsByClassName("hidden")[0].className = "visible"
            document.getElementById("float").innerText = `Passwords Must Match`
            setTimeout(function () {
                document.getElementById("float").className = "hidden";
            }, 3000)

        }
    }
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)

    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    return (
        <div id="register">
            <Box component="form" noValidate autoComplete="off" id="register" onSubmit={handleSubmit}>
                <TextField required id="registersername" label="Username:" value={username} variant="standard" onChange={handleUsernameChange} />
                <TextField required id="registerpassword" label="Password:" value={password} variant="standard" type="password" onChange={handlePasswordChange} />
                <TextField error={passwordMatch} helperText="Passwords must match" required id="registerpasswordconfirm" label="Confirm Password:" value={confirmPassword} variant="standard" type="password" onChange={handleConfirmPasswordChange} />
                <Button variant="contained" color="primary" type="submit" sx={{ mt: .5 }}>Submit</Button>
            </Box>
        </div>

    )
}



export default Register