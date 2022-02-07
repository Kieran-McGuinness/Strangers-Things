import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, useHistory } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./Theme"
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import ForumIcon from '@mui/icons-material/Forum';
import Tooltip from '@mui/material/Tooltip';



import {
  LoginForm,
  Posts,
  Profile,
  Register,
  ViewPost,
  EditPost
} from "./components";


const App = () => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [postsToDisplay, setPostsToDisplay] = useState([])
  const [authToken, setAuthToken] = useState(true)
  const [currentAuthToken, setCurrentAuthToken] = useState("")
  useEffect(() => {
    // checks if authentication token is in local storage
    localStorage.getItem("myToken")
      ?
      setCurrentAuthToken(localStorage.getItem("myToken"))
      :
      setAuthToken(null)
  }, [])

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className='app'>
          <div id="float" className="hidden" >
            <p></p>
          </div>
          <div id='navigation'>
            <Box
              sx={{ m: 1, ml: 0 }}>
              <ButtonGroup color="secondary" size="large" variant="contained" aria-label="text button group">
                <Link to="/posts" id="postslink">
                  <Tooltip title="Posts">
                    <IconButton>
                      <ForumIcon />
                    </IconButton>
                  </Tooltip>
                </Link>
                {authToken ?
                  // if authentication token exists displays the profile button
                  <Link to="/profile" id="profilelink">
                    <Tooltip title="Profile">
                      <IconButton aria-label="profile">
                        <AccountBoxIcon />
                      </IconButton>
                    </Tooltip>
                  </Link>
                  :
                  <></>}
                {/* displays logout icon and text if key is present in local storage, if no key is stored displays the login icon and text */}
                <Link to="/login" id="loggedinlink">
                  {authToken ?
                    <Tooltip title="Log Out">
                      <IconButton aria-label="Log Out">
                        <LogoutIcon />
                      </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Log In">
                      <IconButton aria-label="Log in">
                        <LoginIcon />
                      </IconButton>
                    </Tooltip>}
                </Link>

              </ButtonGroup>
            </Box>
            <h1 id="titlelink">Strangers Things</h1>
          </div>
          <div id='main-section'>
            <Route exact path={["/", "/login"]}>
              <LoginForm authToken={authToken} setAuthToken={setAuthToken} currentAuthToken={currentAuthToken} setCurrentAuthToken={setCurrentAuthToken} />
            </Route>

            <Route exact path="/posts">
              <Posts loadedPosts={loadedPosts} setLoadedPosts={setLoadedPosts} postsToDisplay={postsToDisplay} setPostsToDisplay={setPostsToDisplay} />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/posts/:id">
              <ViewPost loadedPosts={loadedPosts} setLoadedPosts={setLoadedPosts} setPostsToDisplay={setPostsToDisplay} />
            </Route>
            <Route path="/editpost">
              <EditPost />
            </Route>
          </div>
        </div>
      </ThemeProvider>
    </Router >
  )
}

ReactDOM.render(
  <App />,
  document.querySelector("#app")
)