import request from '@/utils/request'

// 修改用户名
export const updateUser = (user) => {
    return request('/user/name', 'post', { user } )
}

// 修改密码
export const updatePass = (oldPass, password) => {
    return request('/user/pass', 'post', { oldPass, password })
}

// 获取访客
export const getVisitor = () => {
    return request('/visitor', 'get')
}