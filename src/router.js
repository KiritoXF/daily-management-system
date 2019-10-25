const routers = [{
        path: '/',
        meta: {
            title: 'Main Page' 
        },
        component: (resolve) => require(['./views/index.vue'], resolve)
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login'
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/myDaily',
        name: 'myDaily',
        meta: {
            title: 'My Daily'
        },
        component: (resolve) => require(['./views/daily/myDaily.vue'], resolve)
    },
    {
        path: '/myDaily/weekDaily',
        name: 'weekDaily',
        meta: {
            title: 'Week Daily'
        },
        component: (resolve) => require(['./views/daily/weekDaily.vue'], resolve)
    },
    {
        path: '/myDaily/add',
        meta: {
            title: 'Add My Daily'
        },
        component: (resolve) => require(['./views/daily/addMyDaily.vue'], resolve)
    },
    {
        path: '/todo',
        name: 'mytodo',
        meta: {
            title: 'Todo List'
        },
        component: (resolve) => require(['./views/todo/myTodo.vue'], resolve)
    },
    {
        path: '/setting',
        name: 'setting',
        meta: {
            title: 'Setting'
        },
        component: (resolve) => require(['./views/setting.vue'], resolve)
    },
    {
        path: '/shopPanel',
        name: 'shopPanel',
        meta: {
            title: 'Shop Panel'
        },
        component: (resolve) => require(['./views/panels/shopPanel.vue'], resolve)
    },
    {
        path: '/adventure',
        name: 'adventure',
        meta: {
            title: 'Adventure'
        },
        component: (resolve) => require(['./views/adventure/company/coding.vue'], resolve)
    }
];
export default routers;