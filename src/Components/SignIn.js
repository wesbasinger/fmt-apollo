/*global navigator */

import React from 'react';

import { Redirect } from 'react-router-dom';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import isRemote from '../isRemote';

import { getSignIns } from '../queries';

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
            geolocation: {},
            formComplete: false
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
        if(this.state.formComplete) {
            return(<Redirect to="/" from="/signIn" />);
        } else {
            return(
                <div className="container">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        
                        const self = this;
                        
                        if(this.state.remote && isRemote(this.state.geolocation)) {
                            alert("Must check work from home if you are remote.");
                        } else {
                            this.props.mutate({
                                refetchQueries: [{
                                    query: getSignIns
                                }],
                                variables: {
                                    worker: this.state.worker,
                                    sessionSlug: this.state.slug,
                                    comment: this.state.comment,
                                    castId: this.state.castId,
                                    remote: this.state.remote
                                }
                            }).then(({data}) =>{
                                console.log(data);
                                self.setState({formComplete:true})
                            }).catch((errors) => {
                                console.log(errors);
                                self.setState({formComplete:true})
                            })
                        }
                    }}>
                        <div className="form-group">
                            <label htmlFor="worker">Worker</label>
                            <input className="form-control" id="worker" type="text" required="true" value={this.state.worker}
                                onChange={(e) => {
                                    this.setState({worker: e.target.value})
                                }} />
                            <CastPicker onCastChange={this.handleCastChange} />
                            <label htmlFor="comment">Comment</label>
                            <input id="comment" className="form-control" type="text" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="work-from-home">Work From Home</label>
                            <input id="work-from-home" className="form-check-input" type="checkbox" value={this.state.workFromHome} onChange={(e) => {
                                this.setState({workFromHome: !this.state.workFromHome})}} />
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
            )
        }
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
            id
        }
    }
  }
`;

const MutationForm = graphql(mutation)(SignIn);

export default MutationForm;