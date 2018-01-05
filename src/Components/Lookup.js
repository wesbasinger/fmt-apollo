import React from 'react';

import CastPicker from './CastPicker'

class Lookup extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            formComplete: false,
            castId: "",
            slug: ""
        }
        
        this.handleCastChange = this.handleCastChange.bind(this);
    }
    
    handleCastChange(fieldValue) {
        const delim = fieldValue.split(":");
        const castId =delim[0];
        const slug = delim[1];
        this.setState({castId, slug})
    }
    
    render() {
        
        if (!this.state.formComplete) {
            return(
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        // need to do a mutation with castID and slug here.
                    }}>
                        <CastPicker onCastChange={this.handleCastChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
        }
    }
}

export default Lookup;

