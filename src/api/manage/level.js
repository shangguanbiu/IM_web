import request from '@/utils/request'
const levelApi = {};

/**
 * 用户列表
 * @param {*} data
 */
levelApi.getUserList = (data) => {
    return request({
        url: "/manage/Level/index",
        method: "post",
        data: data,
    });
};

// 添加用户
levelApi.addUser = (data) => {
    return request({
        url: "/manage/Level/add",
        method: "post",
        data: data,
    });
};

// 修改用户
levelApi.editUser = (data) => {
    return request({
        url: "/manage/Level/edit",
        method: "post",
        data: data,
    });
};

// 删除用户
levelApi.delUser = (data) => {
    return request({
        url: "/manage/Level/del",
        method: "post",
        data: data,
    });
};

// 用户详情
levelApi.getUserDetail = (data) => {
    return request({
        url: "/manage/Level/detail",
        method: "post",
        data: data,
    });
};

// 修改密码
levelApi.editPassword = (data) => {
    return request({
        url: "/manage/Third/editPassword",
        method: "post",
        data: data,
    });
};

// 修改状态
levelApi.setStatus = (data) => {
    return request({
        url: "/manage/Third/setStatus",
        method: "post",
        data: data,
    });
};

// 设置角色
levelApi.setRole = (data) => {
    return request({
        url: "/manage/Third/setRole",
        method: "post",
        data: data,
    });
};



export default levelApi;