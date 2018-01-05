import React from 'react';

import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class SignOut extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {hourId: "---"}
    }
    
    render() {
        return (
            <div>
                <form>
                    <select value={this.state.hourId} onChange={(e) => {this.setState({hourId: e.target.value})}}>
                        <option>---</option>
                        {
                            this.props.data.signIns ?
                            this.props.data.signIns.map((signIn) => {
                                return(<option key={signIn.Id} value={signIn.Id}>{signIn.worker}</option>)
                            }) : <option></option>
                        }
                    </select>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const query  = gql`
query {
  signIns {
    Id
    worker
    remote
  }
}`

const LoadedSignOut = graphql(query)(SignOut)

export default LoadedSignOut;

