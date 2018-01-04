import React from 'react';
 
class SignIn extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            worker: "",
            cast: "---",
            workFromHome: false,
            comment: ""
        }
    }
    

    render() {
        return(
            <div>
                <form>
                    <label htmlFor="worker">Worker</label>
                    <input type="text" required="true" value={this.state.worker}
                        onChange={(e) => {
                            this.setState({worker: e.target.value})
                        }} />
                    <label htmlFor="cast">Cast</label>
                    <select value={this.state.cast} onChange={(e) => {this.setState({cast: e.target.value})}}>
                        <option>---</option>
                        <option value="Annabelle">Annabelle</option>
                        <option value="Joey">Joey</option>
                    </select>
                    <label htmlFor="work-from-home">Work From Home</label>
                    <input type="checkbox" value={this.state.workFromHome} onChange={(e) => {
                        this.setState({workFromHome: !this.state.workFromHome})}} />
                    <label htmlFor="comment">Comment</label>
                    <input type="text" value={this.state.comment} onChange={(e) => {this.setState({comment: e.target.value})}} />
                </form>
            </div>
        )
    }
}

export default SignIn;

