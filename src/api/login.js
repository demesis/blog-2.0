import request from "@/utils/request";

// 注册
export const register = (user, password) => {
    return request('/reg', 'post', { user, password })
}

// 登录
export const toLogin = (user, password) => {
    return request('/login', 'post', { user, password })
}

// 检测是否登录
export const checkLogin = () => {
    return request('/login/check', 'post')
}

// 退出登录
export const loginout = () => {
    return request('/login/loginout', 'post')
}