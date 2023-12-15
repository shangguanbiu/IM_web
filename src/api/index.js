// 引入其他模块的接口
import taskApi from '@/api/manage/task.js';
import configApi from '@/api/manage/config.js';
import userApi from '@/api/manage/user.js';
import thirdApi from '@/api/manage/third.js';
import groupApi from '@/api/manage/group.js';
import imApi from '@/api/im.js';
import commonApi from '@/api/common.js';
import friendApi from '@/api/friend.js';
import levelApi from '@/api/manage/level.js';
// 导出接口
export default {
    taskApi,
    configApi,
    userApi,
    groupApi,
    imApi,
    commonApi,
    friendApi,
    thirdApi,
    levelApi
}