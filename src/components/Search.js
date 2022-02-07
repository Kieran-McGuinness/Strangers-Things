import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Search = (props) => {
    const setPostsToDisplay = props.setPostsToDisplay
    const loadedPosts = props.loadedPosts
    const [searchTerm, setSearchTerm] = useState("")
    function postMatches(post, term) {
        // checks if description, title, location or authors names from all posts contain the search term
        if (post.description.toLowerCase().includes(term.toLowerCase())
            ||
            post.title.toLowerCase().includes(term.toLowerCase())
            ||
            post.location.toLowerCase().includes(term.toLowerCase())
            ||
            post.author.username.toLowerCase().includes(term.toLowerCase())
        ) {
            return true
        }
    }
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    const handleSubmitSearch = (event) => {
        // filters only for posts that contain the searched word and displays them instead of all posts
        event.preventDefault()
        const filteredPosts = loadedPosts.filter(post => postMatches(post, searchTerm));
        setPostsToDisplay(searchTerm.length ? filteredPosts : loadedPosts)
        // console.log(searchTerm)
        setSearchTerm("")
    }




    return (
        <Box component="form" id="searchform"
            sx={{
                '& .MuiTextField-root': { m: 0, width: '25ch' },
            }}
            noValidate
            autoComplete="off" onSubmit={handleSubmitSearch}>
            <TextField
                id="site-search"
                label="Search Posts..."
                type="search"
                variant="standard"
                onChange={handleSearchChange}
                value={searchTerm}
            />
            <Button sx={{ mb: 2 }} variant="contained" color="primary" size="small" type="submit">Search</Button>
        </Box>
    )
}

export default Search
