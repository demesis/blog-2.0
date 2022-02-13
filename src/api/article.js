import request from "@/utils/request";

// 获取页数文章列表
export const getArticle = (pages) => {
    return request('/art/all', 'post', { pages })
}

// 获取前三文章
export const getThree = () => {
    return request('/art/hot', 'get')
}

// 获取文章文件
export const getMd = (_id) => {
    return request('/art/address', 'post', { _id } )
}
// 获取文件内容
export const getValue = (url) => {
    return request(url, 'get')
}

// 上传文章
export const articleAdd = (title, des, md) => {
    return request('/admin/articleAdd', 'post', { title, des, md } )
}

// 获取所有文章列表
export const getAllArticle = () => {
    return request('/art/article', 'get')
}

// 文章删除
export const deleteArticle = (_id, md) => {
    return request('/admin/articleDelete', 'delete', { _id, md })
}