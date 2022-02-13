import request from "@/utils/request";

// 用户留言
export const messageSubmit = (msg) => {
    return request('/msg/report', 'post', { msg })
}

// 获取留言
export const getMessage = (pages) => {
    return request('/msg/get', 'post', { pages })
}

//回复提交
export const replySubmit = (msg, _id, replyUserId) => {
    return request('/msg/reply', 'post', { msg, _id, replyUserId })
}

// 点赞
export const likeClick = (item, childItem) => {
    return request('/msg/like', 'post', { item, childItem })
}