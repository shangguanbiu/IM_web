import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/views/Demo'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import manage from './manage.js'
import manage_com from './manage_com.js'
import manage_agent from './manage_agent.js'

Vue.use(Router)

export const constantRouterMap = [

    {
        path: '/chat',
        name: 'chat',
        component: Home,
        meta: { title: '聊天演示页' }
    },
    {
        path: '/demo',
        name: 'demo',
        component: Demo,
        meta: { title: '演示页' }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { title: '注册' }
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: '聊天' }
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import('@/views/404'),
        hidden: true
    }
];
let getitem = localStorage.getItem('userinfo')
let user_info_obj = JSON.parse(getitem)
let createRouter;

if(user_info_obj !==null){

    if(user_info_obj.role ==2&&user_info_obj.ifagent ==0){
         createRouter = () => new Router({
            mode: 'hash', // require service support
            scrollBehavior: () => ({ y: 0 }),
            routes: [...constantRouterMap, ...manage_com]
        })
    }
    if(user_info_obj.role ==2&&user_info_obj.ifagent ==1){
        createRouter = () => new Router({
           mode: 'hash', // require service support
           scrollBehavior: () => ({ y: 0 }),
           routes: [...constantRouterMap, ...manage_agent]
       })
   }
    
    if(user_info_obj.role ==1){
         createRouter = () => new Router({
            mode: 'hash', // require service support
            scrollBehavior: () => ({ y: 0 }),
            routes: [...constantRouterMap, ...manage]
        })
    }
    if(user_info_obj.role ==0){
        createRouter = () => new Router({
           mode: 'hash', // require service support
           scrollBehavior: () => ({ y: 0 }),
           routes: [...constantRouterMap]
       })
   }

}else{
    createRouter = () => new Router({
        mode: 'hash', // require service support
        scrollBehavior: () => ({ y: 0 }),
        routes: [...constantRouterMap, ...manage]
    })
}
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router