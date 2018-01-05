/*global navigator */

import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import isRemote from '../isRemote';

import CastPicker from './CastPicker';
 
class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            worker: "",
            castId: "---",
            slug: "",
            remote: false,
            comment: "",
            geolocation: {}
        }
        
        this.handleCastChange = this.handleCastChange.bind(this);
    }
    
    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            const geolocation = {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            }
            this.setState({geolocation});
        })
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
                <form onSubmit={(e) => {
                    e.preventDefault();
                    
                    if(this.state.remote && isRemote(this.state.geolocation)) {
                        alert("Must check work from home if you are remote.");
                    } else {
                        this.props.mutate({
                            variables: {
                                worker: this.state.worker,
                                sessionSlug: this.state.slug,
                                comment: this.state.comment,
                                castId: this.state.castId,
                                remote: this.state.remote
                            }
                        }).then(({data}) =>{
                            console.log(data);
                        }).catch((errors) => {
                            console.log(errors);
                        })
                    }
                }}>
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
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
  mutation punchIn(
    $worker: String
    $sessionSlug: String
    $comment: String
    $castId: String
    $remote: Boolean) {
    punchIn(worker: $worker, sessionSlug: $sessionSlug, comment: $comment, castId: $castId, remote: $remote) {
        newHours {
            Id
        }
    }
  }
`;

const MutationForm = graphql(mutation)(SignIn);

export default MutationForm;