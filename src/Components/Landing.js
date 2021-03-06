import React from 'react';

import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="container">
            <div className="jumbotron">
                <h1>Welcome to the FMT Workday Sign In</h1>
                <button><Link to="/signIn">Sign In</Link></button>
                <button><Link to="/signOut">Sign Out</Link></button>
            </div>
        </div>
    )
}

export default Landing;

