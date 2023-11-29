import request from '@/utils/request'
const thirdApi = {};

/**
 * 用户列表
 * @param {*} data
 */
thirdApi.getUserList = (data) => {
    return request({
        url: "/manage/Third/index",
        method: "post",
        data: data,
    });
};

// 添加用户
thirdApi.addUser = (data) => {
    return request({
        url: "/manage/Third/add",
        method: "post",
        data: data,
    });
};

// 修改用户
thirdApi.editUser = (data) => {
    return request({
        url: "/manage/Third/edit",
        method: "post",
        data: data,
    });
};

// 删除用户
thirdApi.delUser = (data) => {
    return request({
        url: "/manage/Third/del",
        method: "post",
        data: data,
    });
};

// 用户详情
thirdApi.getUserDetail = (data) => {
    return request({
        url: "/manage/Third/detail",
        method: "post",
        data: data,
    });
};

// 修改密码
thirdApi.editPassword = (data) => {
    return request({
        url: "/manage/Third/editPassword",
        method: "post",
        data: data,
    });
};

// 修改状态
thirdApi.setStatus = (data) => {
    return request({
        url: "/manage/Third/setStatus",
        method: "post",
        data: data,
    });
};

// 设置角色
thirdApi.setRole = (data) => {
    return request({
        url: "/manage/Third/setRole",
        method: "post",
        data: data,
    });
};


export default thirdApi;