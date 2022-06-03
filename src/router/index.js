import Vue from 'vue'
import Router from 'vue-router'
import AddItem from '@/components/AddItem'
import ViewItems from '@/components/ViewItems'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'AddItem',
            component: AddItem
        },
        {
            path: '/view',
            name: 'ViewItems',
            component: ViewItems
        },
        {
            path: '*',
            redirect: '/',
        }
    ]
})
