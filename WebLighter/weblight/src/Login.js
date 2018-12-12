import React, { Component } from 'react'
import './Login.css';
// 路由
import { Redirect } from 'react-router-dom';
// 登录接口
import Auth from './Auth';

class Login extends Component {
    state = {
        isAuthenticated: Auth.isAuthenticated,
        username: '',
        password: '',
    }

    render() {
        const { isAuthenticated, username, password } = this.state;
        const { from } = this.props.location.state || { from: { pathname: '/' } };
        // 登录成功则重定向到之前用户想浏览的界面
        if (isAuthenticated) return <Redirect to={from} />;
        // 否则填写用户名密码等信息
        return (
            <div id="login">
                <div className="auth-form">
                    <label>用户名/Username or email address</label>
                    <input type="text" name="username" value={username} onChange={this.onInputChange} />
                    <label>密码/Password</label>
                    <input type="password" name="password" value={password} onChange={this.onInputChange} />
                    <button onClick={this.signIn}>登录</button>
                    <button onClick={this.signUp}>注册</button>
                </div>
            </div>
        );
    }

    onInputChange = (e) => {
        // 可以 console.log(e.target); 试试
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    signIn = () => {
        const { username, password } = this.state;
        // 登录
        Auth.signin({ username, password }).then(() => {
            // 登录成功，跳转
            this.setState({ isAuthenticated: true });
        }).catch((e) => {
            // 登录失败，提示
            console.log('用户名或密码不正确');
        });
    }

    signUp = () => {
        this.props.history.replace('/signup');
    }
}

export default Login;
