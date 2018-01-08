import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import SessionDetail from './SessionDetail';

const CastDetail = (props) => {
    
    const cast = (props.data.singleCast)
    
    if (cast) {
        return(
            <div>
                <h1>Cast Detail for {cast.firstName + " " + cast.lastName}</h1>
                {
                    cast.sessions.map((session) => {
                        if (session.active) {
                            return(<SessionDetail key={session.slug} show={session.show} slug={session.slug} hours={session.hours}/>);
                        } else {
                            return(<div key={session.slug}></div>)
                        }
                    })
                }
            </div>
        )
    } else {
        return(<div></div>)
    }
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
        return({variables: {Id: ownProps.match.params.castId}})
    }
})(CastDetail)

export default LoadedCastDetail;

