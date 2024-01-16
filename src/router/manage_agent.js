import Manage from '@/views/Manage'
export default [
    {
        path: '/manage',
        name: 'manage',
        component: Manage,
        meta: { title: '管理' },
        icon: 'el-icon-s-tools',
        children: [
            {
                path: '/manage/index',
                name: 'index',
                component: () =>import ('@/views/manage/level.vue'),
                meta: { 
                    title: '等级',
                    icon: 'el-icon-medal-1'
                }
            },
            {
                path: '/manage/user',
                name: 'user',
                component: () =>import ('@/views/manage/user.vue'),
                meta: { 
                    title: '成员',
                    icon: 'el-icon-user'
                }
            },
            {
                path: '/manage/group',
                name: 'group',
                component: () =>import ('@/views/manage/group.vue'),
                meta: { 
                    title: '群聊',
                    icon: 'el-icon-chat-dot-square'
                }
            },
            // {
            //     path: '/manage/third',
            //     name: 'third',
            //     component: () =>import ('@/views/manage/third.vue'),
            //     meta: { 
            //         title: '第三方',
            //         icon: 'el-icon-s-fold'
            //     }
            // },
            {
                path: '/manage/talklist',
                name: 'third',
                component: () =>import ('@/views/manage/talklist.vue'),
                meta: { 
                    title: '打招呼记录',
                    icon: 'el-icon-s-fold'
                }
            },{
                path: '/manage/shop',
                name: 'shop',
                component: () =>import ('@/views/manage/shop.vue'),
                meta: { 
                    title: '商店',
                    icon: 'el-icon-s-fold'
                }
            },
            {
                path: '/manage/files',
                name: 'files',
                component: () =>import ('@/views/manage/files.vue'),
                meta: { 
                    title: '文件',
                    icon: 'el-icon-folder-opened'
                }
            },
        ]
    }
];