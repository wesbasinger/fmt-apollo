import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import CastPicker from './CastPicker';
 
class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            worker: "",
            castId: "---",
            slug: "",
            remote: false,
            comment: ""
        }
        
        this.handleCastChange = this.handleCastChange.bind(this);
    }
    
    handleCastChange(fieldValue) {
        const delim = fieldValue.split(":");
        const castId = delim[0];
        const slug = delim[1];
        this.setState({castId, slug})
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
                    <CastPicker onCastChange={this.handleCastChange} />
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

export default SignIn;

