import React from 'react';
// 路由组件
import { Route, Redirect } from 'react-router-dom';
// 登录服务
import Auth from './Auth';

/*
 * 自定义路由
 * 把 Route 修改包装为了 PrivateRoute
 * 可以实现只有在登录时才能浏览此页面，否则自动跳转到登录页面
 */
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
    Auth.isAuthenticated ? (
      // 已登录，显示此页面
      <Component {...props} />
    ) : (
      // 未登录，重定向到登录页面
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
);

export default PrivateRoute;
