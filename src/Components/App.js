import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import Landing from './Landing';
import Lookup from './Lookup';
import SignIn from './SignIn';
import SignOut from './SignOut'
import CastDetail from './CastDetail';
import CreateCast from './CreateCast';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Landing}/>
                    <Route path="/lookup" component={Lookup} />
                    <Route path="/signIn" component={SignIn} />
                    <Route path="/signOut" component={SignOut} />
                    <Route path="/castDetail/:castId/:slug" component={CastDetail} />
                    <Route path="/create" component={CreateCast} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
}

export default App;