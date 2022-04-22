import Vue from 'vue'
import Router from 'vue-router'
import Bookmark from '@/components/home/Bookmark'
import AddBookmark from '@/components/home/AddBookmark'
import SharedBookmark from '@/components/home/SharedBookmark'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bookmark',
      component: Bookmark
    },
    {
      path: '/addbookmark',
      name: 'AddBookmark',
      component: AddBookmark
    },
    {
      path: '/sharebookmark',
      name: 'SharedBookmark',
      component: SharedBookmark
    }
  ]
})
