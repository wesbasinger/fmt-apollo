import React from 'react';

import { graphql } from 'react-apollo';

import { getActiveCast } from '../queries';

const CastPicker = (props) => {
    return(
        <div>
            <label htmlFor="cast">Cast</label>
            <select onChange={(e) => {props.onCastChange(e.target.value)}}>
                <option>---</option>
                {
                    props.data.activeCast ? props.data.activeCast.map((cast) => {
                        return(
                        <option key={cast.id} 
                        value={cast.id + ":" + cast.sessions[0].slug}>
                            {cast.firstName + " " + cast.lastName}
                        </option>)
                    }) : <option></option>
                }
            </select>
        </div>
    )
}

const LoadedCastPicker = graphql(getActiveCast)(CastPicker);

export default LoadedCastPicker;