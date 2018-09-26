import Vue from 'vue'
import Router from 'vue-router'
import BookManagement from '@/components/BookManagement'
import ProjectManagement from '@/components/ProjectManagement'
import RentManagement from '@/components/RentManagement'
import BookEdit from '@/components/BookEdit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ProjectManagement',
      name: 'ProjectManagement',
      component: ProjectManagement
    },
    {
      path: '/BookManagement',
      name: 'BookManagement',
      component: BookManagement
    },
    {
      path: '/RentManagement',
      name: 'RentManagement',
      component: RentManagement
    }
  ]
})
