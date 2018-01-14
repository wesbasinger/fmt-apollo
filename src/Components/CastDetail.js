import React from 'react';

import { graphql } from 'react-apollo';

import { getSingleCast } from '../queries';

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

const LoadedCastDetail = graphql(getSingleCast, {
    options: (ownProps) => {
        return({variables: {id: ownProps.match.params.castId}})
    }
})(CastDetail)

export default LoadedCastDetail;

