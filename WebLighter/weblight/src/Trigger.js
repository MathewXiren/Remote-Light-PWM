import React, { Component } from 'react';
import './Trigger.css';

export default class Trigger extends Component {
    constructor(props) {
        super(props);
        const { enable=false, hour=0, minute=0, status=false } = props;
        this.state = { enable, hour, minute, status };
    }

    static range(start, end, step=1) {
        const arr = [];
        for (let i = start; i < end; i += step ) {
            const flag = i < 10 ? `0${i}` : `${i}`;
            arr.push(flag);
        }
        return arr;
    }

    render() {
        const { enable, hour, minute, status } = this.state;
        return(
            <div className="trigger">
                <div className="enable">
                    <input className="enable-checkbox" type="checkbox" checked={enable} onChange={this.onEnableChange} />
                    <div className="switcher"><div className="round"></div></div>
                </div>
                <div className="time">
                    <div className="back-block"></div>
                    <div className="back-block"></div>
                    <div className="time-box">
                        <select className="hour" value={hour} onChange={this.onHourChange}>
                            {Trigger.range(0, 24).map(hour => (
                                <option key={hour} value={hour}>{hour}</option>
                            ))}
                        </select>
                        <select className="minute" value={minute} onChange={this.onMinuteChange}>
                            {Trigger.range(0, 60).map(minute => (
                                <option key={minute} value={minute}>{minute}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="status">
                    <input className="status-checkbox" type="checkbox" checked={status} onChange={this.onStatusChange} />
                    <svg className="bulb-button" width="40" height="40" viewBox="0 0 48 48">
                        <path d="M18 42c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2H18v2zm6-38c-7.73 0-14 6.27-14 14 0 4.76 2.38 8.95 6 11.48V34c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.52c3.62-2.53 6-6.72 6-11.48 0-7.73-6.27-14-14-14zm5.71 22.2L28 27.39V32h-8v-4.6l-1.71-1.19C15.6 24.33 14 21.27 14 18.01c0-5.51 4.49-10 10-10s10 4.49 10 10c0 3.25-1.6 6.31-4.29 8.19z"/>
                    </svg>
                </div>
            </div>
        );
    }

    onEnableChange = (e) => {
        const enable = e.target.checked;
        this.setState({ enable }, this.update);
    }

    onHourChange = (e) => {
        const hour = e.target.value;
        this.setState({ hour }, this.update);
    }

    onMinuteChange = (e) => {
        const minute = e.target.value;
        this.setState({ minute }, this.update);
    }

    onStatusChange = (e) => {
        const status = e.target.checked;
        this.setState({ status }, this.update);
    }

    update = () => {
        const { enable, hour, minute, status } = this.state;
        this.props.onChange({ enable, hour, minute, status });
    }
}