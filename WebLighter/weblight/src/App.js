import React from 'react';
import './App.css';
// LeanCloud
import AV from 'leancloud-storage';
// 路由
import { BrowserRouter as Router, Route } from 'react-router-dom';
// 组件
import PrivateRoute from './PrivateRoute'; // 私有类型路由，只有登录后才能查看的路由
// 页面
import Login from './Login'; // 登录界面
import AuthHead from './AuthHead'; // 用户面板
import Dashboard from './Dashboard'; // 操作界面
import SignUp from './SignUp';

// 初始化 LeanCloud
const appId = 'aCIvbENIdXVa4MCmuqdyeqlh-gzGzoHsz';
const appKey = 'y0WWO1TVxCKnBkL3T7nmoIDT';
AV.init({ appId, appKey });

// console.log(new Date().getTime());

// 整个网站的路由定义
const App = () => (
    <Router>
        <div id="app">
            <AuthHead />
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </div>
    </Router>
);

export default App;
