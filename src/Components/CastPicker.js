import React from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const CastPicker = (props) => {
    return(
        <div>
            <label htmlFor="cast">Cast</label>
            <select onChange={(e) => {props.onCastChange(e.target.value)}}>
                <option>---</option>
                {
                    props.data.activeCast ? props.data.activeCast.map((cast) => {
                        return(
                        <option key={cast.Id} 
                        value={cast.Id + ":" + cast.sessions[0].slug}>
                            {cast.firstName + " " + cast.lastName}
                        </option>)
                    }) : <option></option>
                }
            </select>
        </div>
    )
}

const query  = gql`
query {
  activeCast {
    Id
    firstName
    lastName
    sessions {
      slug
    }
  }
}`

const LoadedCastPicker = graphql(query)(CastPicker);

export default LoadedCastPicker;