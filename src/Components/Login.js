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
            <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" name="username" placeholder="Username" onChange={(e) => {this.setState({username: e.target.value})}} required="true" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => {this.setState({password: e.target.value})}} required="true" />
                </div>
                <button type="submit" className="btn btn-default" onClick={(e) => {
                    e.preventDefault()
                    this.props.onSubmit(this.state.username, this.state.password);
                }}>Sign In</button>
            </form>
        )
    }
}

export default Login;