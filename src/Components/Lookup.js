import React from 'react';

import { Link } from 'react-router-dom';

import CastPicker from './CastPicker'

class Lookup extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
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
        
        const castDetailLink = `/castDetail/${this.state.castId}/${this.state.slug}`;
        
        return(
            <div className="container">
                <CastPicker onCastChange={this.handleCastChange} />
                <Link to={castDetailLink}><button>Lookup</button></Link>
            </div>
        )
    }
}

export default Lookup;

