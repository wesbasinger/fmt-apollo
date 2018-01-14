import React from 'react';

import { Link } from 'react-router-dom';

import Login from './Login';

class Header extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
        
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(username, password) {
        if(username ===  "fmt" && password === "fmt") {
            this.setState({loggedIn: true})
        } else {
            alert("Username and/or password incorrect");
        }
    }
    
    render() {
        return (
            <div>
                <Link to="/">FMT Workday Sign In</Link>
                <ul>
                    <li><Link to="/signIn">Sign In</Link></li>
                    <li><Link to="/signOut">Sign Out</Link></li>
                    <li><Link to="/lookup">Lookup</Link></li>
                    {
                        this.state.loggedIn ? <li><Link to="/create">Create Cast</Link></li> : ""
                    }
                    {
                        this.state.loggedIn ? <li><Link to="/add">Add Session to Cast</Link></li> : ""
                    }
                    {
                        this.state.loggedIn ? <li><Link to="/download">Download Data</Link></li> : ""
                    }                   
                    {
                        !this.state.loggedIn ? <Login onSubmit={this.handleSubmit}/> : <button onClick={ () => {this.setState({loggedIn: false})}}>Sign Out</button>
                    }
                </ul>
            </div>
        )   
    }
}

export default Header;

