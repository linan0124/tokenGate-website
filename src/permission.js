import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { getToken } from '@/util/auth' // 验权
import { Message } from 'element-ui'

const routeList = router.options.routes
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) { // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      // for (var i = 0; i < routeList.length; i++) {
      //   var element = routeList[i]
      //   if (element.path === to.path) {
      //     next()
      //     break
      //   } else {
      //     if (i === (routeList.length - 1)) {
      //       next({path: '/404'})
      //       NProgress.done()
      //     }
      //   }
      // }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({path: '/login'})
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
