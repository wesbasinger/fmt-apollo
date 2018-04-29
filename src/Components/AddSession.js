import React from 'react';

import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

class AddSession extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedCast: "",
            show: "",
            slug: ""
        }
    }


    render() {
        return(
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    
                    const cast = this.props.data.allCast.find((cast) => {
                        return cast.id === this.state.selectedCast;
                    })
                    
                    let duplicate = false;
                    
                    const slug = this.state.slug;
                    
                    cast.sessions.forEach((session) => {
                        if(session.slug === slug) {
                            duplicate = true;
                        }
                    })
                    
                    if(duplicate) {
                        alert("Duplicate session assignment.")
                    } else {
                    
                        this.props.mutate({
                            variables: {
                                castId: this.state.selectedCast,
                                sessionSlug: this.state.slug,
                                show: this.state.show
                            }
                        }).then(({data}) =>{
                            alert("Session added succcessfully.")
                        }).catch((errors) => {
                            alert(errors)
                        })
                    }
    
                }}>
                    <label>Cast</label>
                    <select onChange={(e) => {this.setState({selectedCast: e.target.value})}}>
                        <option>---</option>
                        {
                            this.props.data.allCast ? this.props.data.allCast.map((cast) => {
                                return(
                                    <option key={cast.id} value={cast.id}>{cast.firstName}</option>
                                )
                            }) : <option></option>
                        }
                    </select>
                    <label>Session</label>
                    {/* BEWARE EVIL HARDCODED VALUES LURK BELOW!!!!!!!!!!!!!!!!!!!!!*/}
                    <select onChange={(e) => {this.setState({show: "Hunchback of Notre Dame", slug: "SU18"})}}>
                        <option>---</option>
                        <option>Hunchback of Notre Dame</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const query = gql`
  query allCast {
    allCast {
        id
        firstName
        lastName
        sessions {
            slug
        }
    }
  }
`;

const mutation = gql`
  mutation addSessionToCast(
    $castId: String
    $sessionSlug: String
    $show: String) {
    addSessionToCast(castId: $castId, sessionSlug: $sessionSlug, show: $show) {
        updatedCast {
            id
        }
    }
  }
`;

const ComposedForm = compose(graphql(query), graphql(mutation))(AddSession);

export default ComposedForm;