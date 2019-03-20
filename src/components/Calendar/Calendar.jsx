import React from "react";
import dateFns from "date-fns";
import Modal from '../EventModal/EventModal'
import { connect } from "react-redux";
const mapStateToProps = state => {
    return { events: state.events };
};
class Calendar extends React.Component {
    constructor(props) {
       super(props);
        this.state = {
            currentMonth: new Date(),
            selectedDate: new Date(),
            showEvent: false
        };
    }
    renderHeader() {
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
        <span>
          {dateFns.format(this.state.currentMonth, dateFormat)}
        </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }
    nextMonth = () => {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        });
    };
    prevMonth = () => {
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        });
    };

    renderDays() {
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth, {weekStartsOn: 1});
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>
                    {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
                </div>
            );
        }
        return <div className="days row">{days}</div>;
    }
    renderCells() {
        const { currentMonth, selectedDate } = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart, {weekStartsOn: 1});
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !dateFns.isSameMonth(day, monthStart)
                                ? "disabled"
                                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                            }`}
                        key={day}
                        onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                    >
                        <span className="number">{formattedDate}</span>
                        {this.renderEvents(day)}
                        <span className=""></span>
                    </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    renderEvents(day) {
        if (this.props.events && this.props.events.length > 0) {
            let eventList = [];
            for (let e =0; e< this.props.events.length; e++) {
                if (dateFns.isSameDay(day, this.props.events[e].date)){
                    console.log('event in same day');
                    const stateClassName = (this.props.events[e].state).toLowerCase();
                    eventList.push(
                        <li className={stateClassName}>{this.props.events[e].title}</li>
                    )
                }
            }
            return <ul className="event">{eventList}</ul>;
        }
    }
    onDateClick = day => {
        this.setState({
            selectedDate: day,
            showEvent: !this.state.showEvent
        });
    };
    showModal = () => {
        this.setState({ showEvent: true });
    };

    hideModal = () => {
        this.setState({ showEvent: false });
    };
    render() {
        return (
            <div>
                <Modal show={this.state.showEvent} date={this.state.selectedDate} handleClose={this.hideModal}>
                </Modal>
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Calendar);
