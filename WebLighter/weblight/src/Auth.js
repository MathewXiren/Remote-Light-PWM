// LeanCloud
import AV from 'leancloud-storage';

// 登录接口
const Auth = {
    // 是否已登录
    get isAuthenticated() {
        return Boolean(AV.User.current());
    },
    // 登录
    signin({ username, password }) {
        // 通过用户名密码登录
        return AV.User.logIn(username, password);
    },
    // 登出
    signout(cb) {
        return AV.User.logOut();
    },
    // 注册
    signup({ username, password }) {
        // 新建 AVUser 对象实例
        const user = new AV.User();
        // 设置用户名
        user.setUsername(username);
        // 设置密码
        user.setPassword(password);
        // 注册
        return user.signUp();
    }
};

export default Auth;
