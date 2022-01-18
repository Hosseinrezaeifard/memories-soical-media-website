import React from 'react';
import { Container } from '@material-ui/core'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import Home from './Components/Home/Home';
import Navbar from './Components/Nabvar/Navbar';
import Auth from './Components/Auth/Auth'
import PostDetails from './Components/PostDetails/PostDetails'


const App = () => {

    const user = JSON.parse(localStorage.getItem('profile'))

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Roboto',
                'sans-serif'
            ].join(','),
        },
    });

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Container >
                    <Navbar />
                    <Switch>
                        <Route path="/" exact component={() => <Redirect to="/posts" />} />
                        <Route path="/posts" exact component={Home} />
                        <Route path="/posts/search" exact component={Home} />
                        <Route path="/posts/:id" component={PostDetails} />
                        <Route path="/auth" exact component={() => (!user ? <Auth/> : <Redirect to="/posts"/>)} />
                    </Switch>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App;