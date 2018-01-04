import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
 
class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            worker: "",
            cast: "---",
            workFromHome: false,
            comment: ""
        }
    }
    

    render() {
        return(
            <div>
                <form>
                    <label htmlFor="worker">Worker</label>
                    <input type="text" required="true" value={this.state.worker}
                        onChange={(e) => {
                            this.setState({worker: e.target.value})
                        }} />
                    <label htmlFor="cast">Cast</label>
                    <select value={this.state.cast} onChange={(e) => {this.setState({cast: e.target.value})}}>
                        <option>---</option>
                        {
                            this.props.data.activeCast ? this.props.data.activeCast.map((cast) => {
                                return(
                                <option key={cast.Id} 
                                value={cast.Id + ":" + cast.sessions[0].slug}>
                                    {cast.firstName + " " + cast.lastName}
                                </option>)
                            }) : <option></option>
                        }
                    </select>
                    <label htmlFor="work-from-home">Work From Home</label>
                    <input type="checkbox" value={this.state.workFromHome} onChange={(e) => {
                        this.setState({workFromHome: !this.state.workFromHome})}} />
                    <label htmlFor="comment">Comment</label>
                    <input type="text" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}} />
                </form>
            </div>
        )
    }
}

const query  = gql`
query {
  activeCast {
    Id
    firstName
    lastName
    sessions {
      slug
    }
  }
}`

const LoadedDataSignIn = graphql(query)(SignIn)

export default LoadedDataSignIn;

