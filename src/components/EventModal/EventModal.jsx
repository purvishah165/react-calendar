import React from 'react';

import './EventModal.css';
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addEvent } from "../../actions/index.js";
function mapDispatchToProps(dispatch) {
    return {
        addEvent: event => dispatch(addEvent(event))
    };
}
class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "",
            state: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const id = uuidv1();
        let schedule = {
            title: this.state.title,
            state: this.state.state,
            date: this.props.date,
            id: id
        };

        this.props.addEvent( schedule );
        this.setState({ title: "", state: "" });
        this.props.handleClose();
    }
    render () {
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        return (

            <div className={showHideClassName}>
                <form onSubmit={this.handleSubmit}>
                <div className="modal-main">
                    <div className="modal-header">
                        <input id="title" name="title" type="text" placeholder="Add event and time" className="title" value={this.state.title} onChange={this.handleChange}/>
                        <span className="close-modal-btn" onClick={this.props.handleClose}>×</span>
                    </div>
                    <div className="modal-body">
                        <div id="state" onChange={this.handleChange}>
                            <label for="team" className="state-btn team">
                                <input id="team" type="radio" value="Team" name="state" checked={this.state.state === 'Team'}/>Team</label>
                            <label for="solo" className="state-btn solo">
                                <input type="radio" id="solo" value="Solo" name="state" checked={this.state.state === 'Solo'}/> Solo</label>
                            <label for="company" className="state-btn company">
                                <input type="radio" id="company" value="Company" name="state" checked={this.state.state === 'Company'}/> Company</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn-continue">Save</button>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(Modal);
