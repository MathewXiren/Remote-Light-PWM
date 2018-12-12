import React, { Component } from 'react';
import './Bulb.css';
// LeanCloud
import AV from 'leancloud-storage';

import Trigger from './Trigger';

// id: 灯泡唯一标志符号
// on: 灯泡是否打开
// brightness: 灯泡亮度
export default class Bulb extends Component {
    constructor(props) {
        super(props);
        const { id, on, brightness, trigger } = props;
        this.state = { id, on, brightness, trigger };
        this.bulb = AV.Object.createWithoutData('Bulb', id);
    }

    componentDidUpdate() {
        // 保存灯泡状态到 LeanCloud
        const { on, brightness, trigger } = this.state;
        this.bulb.set('on', on);
        this.bulb.set('brightness', brightness);
        this.bulb.set('trigger', trigger);
        this.bulb.save();
    }

    render() {
        // 根据开关状态和亮度计算灯泡颜色值
        let fill = 'rgb(0,0,0)';
        if (this.state.on) {
            const c = parseInt(this.state.brightness * 255, 10);
            fill = `rgb(${c},${c},${c})`;
        }
        return (
            <li className="bulb">
                <svg width="200" height="200" viewBox="0 0 48 48">
                    <path fill={fill} d="M18 42c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-2H18v2zm6-38c-7.73 0-14 6.27-14 14 0 4.76 2.38 8.95 6 11.48V34c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4.52c3.62-2.53 6-6.72 6-11.48 0-7.73-6.27-14-14-14zm5.71 22.2L28 27.39V32h-8v-4.6l-1.71-1.19C15.6 24.33 14 21.27 14 18.01c0-5.51 4.49-10 10-10s10 4.49 10 10c0 3.25-1.6 6.31-4.29 8.19z"/>
                </svg>
                <div className="buttons">
                    <div className="switch">
                        <input type="checkbox" checked={this.state.on} onChange={this.onSwitchChange} />
                        <span className="checkbox"></span>
                    </div>
                    <div className="toggles">
                        <div className="toggle">
                            <button onClick={this.onToggleAddClick} />
                            <span className="button"></span>
                            <span className="label">+</span>
                        </div>
                        <div className="toggle">
                            <button onClick={this.onToggleSubClick} />
                            <span className="button"></span>
                            <span className="label">-</span>
                        </div>
                    </div>
                </div>
                <Trigger {...this.state.trigger} onChange={this.onTriggerChange} />
            </li>
        );
    }

    update = () => {
        const { id, on, brightness, trigger } = this.state;
        this.props.update({ id, on, brightness, trigger });
    }

    // 点击开关
    onSwitchChange = (e) => {
        this.setState({ on: e.target.checked }, this.update);
    }

    // 点击 + 按钮
    onToggleAddClick = () => {
        const step = 0.2;
        const { on, brightness } = this.state;
        if (!on) return;
        if (brightness + step <= 1) {
            this.setState({ brightness: brightness + step }, this.update);
            console.log(brightness + step);
        }
    }

    // 点击 - 按钮
    onToggleSubClick = () => {
        const step = 0.2;
        const { on, brightness } = this.state;
        if (!on) return;
        if (brightness - step >= 0.1) {
            this.setState({ brightness: brightness - step }, this.update);
            console.log(brightness - step);
        }
    }

    // 定时器改变
    onTriggerChange = (trigger) => {
        this.setState({ trigger }, this.update);
    }
}