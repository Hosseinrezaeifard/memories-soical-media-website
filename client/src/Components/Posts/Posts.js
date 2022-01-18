import React from 'react'
import Post from './Post/Post.js'
import useStyles from '../Posts/Styles'
import { useSelector } from 'react-redux'
import { CircularProgress, Grid } from '@material-ui/core'

function Posts({ setCurrentId }) {
    const { posts, isLoading } = useSelector((state) => state.posts)
    const classes = useStyles()

    if (!posts.length && !isLoading) return 'No Posts Yet!' 
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post) => (
                        <Grid xs={12} sm={12} md={6} lg={4} item key={post._id}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
            </Grid>
        )
    )
}

export default Posts
