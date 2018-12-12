/**
 * Created by ma on 2017/5/14.
 */
import React, { Component } from 'react'
import './SignUp.css';
// 路由
import { Redirect } from 'react-router-dom';
// 登录接口
import Auth from './Auth';

class SignUp extends Component {
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
            <div id="signUp">
                <div className="auth-for">
                    <label>用户名/Username or email address</label>
                    <input type="text" name="username" value={username} onChange={this.onInputChange} />
                    <label>密码/Password</label>
                    <input type="password" name="password" value={password} onChange={this.onInputChange} />
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

    signUp = () => {
        const { username, password } = this.state;
        // 注册
        Auth.signup({ username, password }).then(() => {
            // 注册成功，跳转
            this.setState({ isAuthenticated: true });
        }).catch((e) => {
            // 注册失败，提示
            console.log('注册不成功,用户名可能已存在!');
        });
    }
}

export default SignUp;
