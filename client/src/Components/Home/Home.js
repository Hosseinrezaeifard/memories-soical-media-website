import { Container, Grow, Grid, Paper, AppBar, TextField, Button, Chip } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import React, {  useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  getPostsBySearch } from '../../actions/posts'
import Form from '../Form/Form'
import Pagination from '../../pagination/pagination';
import Posts from '../Posts/Posts'
import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    const classes = useStyles()
    const dispatch = useDispatch();
    const query = useQuery()
    const history = useHistory()
    //this is going to read our url and see if there's a page paramether in there
    //so if we dont have the page we must be in the first one
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            history.push('/')
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => setTags([...tags, tag])

    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))



    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid container spacing={3} justifyContent="space-between" alignItems="stretch" className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar color='inherit' position='static' className={classes.appBarSearch}>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onDelete={handleDelete}
                                onAdd={handleAdd}
                                variant='outlined'
                                label='Search Tags'
                            />
                            <Button color='primary' variant='contained' onClick={searchPost} className={classes.searchButton}>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper elevation={6} className={classes.pagination}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home
