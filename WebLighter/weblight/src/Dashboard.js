import React, { Component } from 'react';
import './Dashboard.css';
// LeanCloud
import AV from 'leancloud-storage';

import Bulb from './Bulb';

class Dashboard extends Component {
    state ={
        bulbs: new Map(),
    }

    componentDidMount() {
        // 从 LeanCloud 查询灯泡状态
        new AV.Query('Bulb').addAscending('order').find().then((bulbs) => {
            this.setState({
                bulbs: new Map(bulbs.map((bulb) => ([ bulb.id, {
                    on: bulb.get('on'),
                    brightness: bulb.get('brightness'),
                    trigger: bulb.get('trigger'),
                }]))),
            });
        });
    }

    render() {
        return (
            <div id="dashboard">
                <ul className="bulbs">
                    {[...this.state.bulbs].map(([id, { on, brightness, trigger }]) => (
                        <Bulb key={id} id={id} on={on} brightness={brightness} trigger={trigger} update={this.update} />
                    ))}
                </ul>
            </div>
        );
    }

    update = ({ id, on, brightness, trigger }) => {
        this.state.bulbs.set(id, { on, brightness, trigger });
        this.setState(this.state, this.updateToServer);
    }

    updateToServer = () => {
        const data = [...this.state.bulbs].map(([id, { on, brightness, trigger }]) => ({ id, on, brightness, trigger }));
        fetch(`http://localhost:5000?data=${JSON.stringify(data)}`).then(() => {}).catch(console.error);
    }
}

export default Dashboard;
