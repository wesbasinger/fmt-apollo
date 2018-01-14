import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }
    
    
    render() {
        return(
            <form onSubmit={(e)=> {
                e.preventDefault();
                this.props.onSubmit(this.state.username, this.state.password);
            }}>
                <label>Username: </label>
                <input type="text" onChange={(e) => {this.setState({username: e.target.value})}} required="true"/>
                <label>Password: </label>
                <input type="password" onChange={(e) => {this.setState({password: e.target.value})}} required="true"/>
                <button type="submit">Sign In</button>
            </form>
        )
    }
}

export default Login;