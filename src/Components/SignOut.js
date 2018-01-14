import React from 'react';

import { Redirect } from 'react-router-dom';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { getSignIns } from '../queries';

class SignOut extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {hourId: "---", formComplete:false}
    }
    
    render() {
        if (this.state.formComplete) {
            return(<Redirect from="/signOut" to="/" />)
        } else {
            return (
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        
                        const self = this;
                        
                        this.props.mutate({
                            refreshQueries: [{query: getSignIns}],
                            variables: {hoursId: this.state.hourId}
                        }).then(({data}) => {
                            console.log(data)
                            self.setState({formComplete:true})
                        }).catch((error) => {
                            console.log(error)
                            self.setState({formComplete:true})
                        })
                    }}>
                        <select value={this.state.hourId} onChange={(e) => {this.setState({hourId: e.target.value})}}>
                            <option>---</option>
                            {
                                this.props.data.signIns ?
                                this.props.data.signIns.map((signIn) => {
                                    return(<option key={signIn.id} value={signIn.id}>{signIn.worker}</option>)
                                }) : <option></option>
                            }
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }
    }
}


const mutation = gql`
  mutation punchOut($hoursId: String) {
    punchOut(hoursId: $hoursId) {
        newHours {
            id
        }
    }
  }
`;

const LoadedSignOut = compose(graphql(getSignIns), graphql(mutation))(SignOut)

export default LoadedSignOut;

