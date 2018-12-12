import React, { Component } from 'react';
import './AuthHead.css';
// LeanCloud
import AV from 'leancloud-storage';
// 路由
import { withRouter } from 'react-router-dom';
// 登录接口
import Auth from './Auth';

class AuthHead extends Component {
    render() {
        // 未登录
        if (!Auth.isAuthenticated) return null;
        // 已登录
        return (
            <div id="auth-head">
                <div className="split"></div>
                <div className="username">{AV.User.current().get('username')}</div>
                <div className="sign-out-btn" onClick={this.signout}>退出</div>
            </div>
        );
    }

    // 点击退出按钮
    signout = (e) => {
        // 退出登录
        Auth.signout().then(() => {
            // 退出登录成功，跳转到登录界面
            this.props.history.push('/login');
        }).catch((e) => {
            // 退出登录失败，提示
            console.log('退出登录失败');
        });
    }
}

export default withRouter(AuthHead);
