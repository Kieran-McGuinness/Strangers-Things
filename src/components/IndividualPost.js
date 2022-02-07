import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@mui/material"

const IndividualPost = (props) => {
    const postId = props.postId
    return (
        // button that a redirects to an individual post
        <div id="viewPost">
            <Link id="viewindividualpost" to={`/posts/${postId}`}>
                <Button sx={{ mb: .5 }} size="small" variant="contained" color="secondary" type="submit">More Options</Button>
            </Link>
        </div>

    )
}

export default IndividualPost