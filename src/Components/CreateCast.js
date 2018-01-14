import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class CreateCast extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            formComplete: false
        }
    }


    render() {
        return(
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    
                    var self = this;

                    this.props.mutate({
                        variables: {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName
                        }
                    }).then(({data}) =>{
                        self.setState({firstName: "", lastName: ""})
                        alert("Cast created succcessfully.")
                    }).catch((errors) => {
                        self.setState({firstName: "", lastName: ""})
                        alert(errors)
                    })
                }}>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" required="true" value={this.state.firstName}
                        onChange={(e) => {
                            this.setState({firstName: e.target.value})
                        }} />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" required="true" value={this.state.lastName}
                        onChange={(e) => {
                            this.setState({lastName: e.target.value})
                        }} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`
  mutation createCast(
    $firstName: String
    $lastName: String) {
    createCast(firstName: $firstName, lastName: $lastName) {
        addedCast {
            id
        }
    }
  }
`;

const MutationForm = graphql(mutation)(CreateCast);

export default MutationForm;