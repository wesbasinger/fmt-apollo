import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const CastDetail = (props) => {
    return(
        <div>This is a cast detail</div>
    )
}

const query = gql`
query singleCast($Id: String){
    singleCast(Id: $Id) {
        Id
        firstName
        lastName
        sessions {
          slug
          show
          active
          hours {
            Id
            worker
            comment
            datestamp
            timeIn
            timeOut
            castId
            remote
          }
        }
    }
}
`

const LoadedCastDetail = graphql(query, {
    options: (ownProps) => {
        console.log(ownProps)
        return({variables: {Id: ownProps.match.params.castId}})
    }
})(CastDetail)

export default LoadedCastDetail;

