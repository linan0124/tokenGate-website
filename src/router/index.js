import Vue from 'vue'
import Router from 'vue-router'

import Main from 'views/Main'
import Login from 'views/login'
import identification from 'views/identification'
import userDetail from 'views/userDetail'
import convert from 'views/convert'
import convertOrderDetail from 'views/convertOrderDetail'
import orderList from 'views/orderList'
import redeem from 'views/redeem'
import redeemOrderDetail from 'views/redeemOrderDetail'
import projectInfo from 'views/projectInfo'
import tokenAssetsManagement from 'views/tokenAssetsManagement'
import userTokenAssetsManage from 'views/userTokenAssetsManage'
import addToken from 'views/addToken'
import userTokenDetail from 'views/userTokenDetail'
import tokenDetail from 'views/tokenDetail'

Vue.use(Router)

const router = new Router({
  routes: [
    // 认证
    {
      path: '/',
      redirect: '/projectInfo',
      component: Main,
      children: [
        // 认证列表
        {
          path: '/identification',
          name: 'identification',
          component: identification
        },
        // 列表审核进入->认证详情/列表申请人进入->用户详情
        {
          path: '/userDetail',
          name: 'userDetail',
          component: userDetail
        },
        {
          path: '/projectInfo',
          name: 'projectInfo',
          component: projectInfo
        }
      ]
    },
    // 铸币
    {
      path: '/convert',
      component: Main,
      children: [
        // 铸币列表
        {
          path: 'convertList',
          name: 'convert',
          component: convert
        },
        // 铸币订单详情
        {
          path: 'convertOrderDetail',
          name: 'convertOrderDetail',
          component: convertOrderDetail
        },
        {
          path: 'orderList',
          name: 'orderList',
          component: orderList
        }
      ]
    },
    // 赎回
    {
      path: '/redeem',
      component: Main,
      children: [
        // 赎回列表
        {
          path: 'redeemList',
          name: 'redeem',
          component: redeem
        },
        // 赎回订单详情
        {
          path: 'redeemOrderDetail',
          name: 'redeemOrderDetail',
          component: redeemOrderDetail
        }
      ]
    },
    // 通证资产管理
    {
      path: '/tokenAssetsManagement',
      component: Main,
      children: [
        // 通证资产管理列表
        {
          path: 'tokenAssetsList',
          name: 'tokenAssetsManagement',
          component: tokenAssetsManagement
        },
        // 添加通证
        {
          path: 'addToken',
          name: 'addToken',
          component: addToken
        }
      ]
    },
    // 用户持币资产管理
    {
      path: '/userTokenAssetsManage',
      component: Main,
      children: [
        // 用户持币资产管理列表
        {
          path: 'userTokenAssetsList',
          name: 'userTokenAssetsManage',
          component: userTokenAssetsManage
        },
        // 用户资产详情
        {
          path: 'userTokenDetail',
          name: 'userTokenDetail',
          component: userTokenDetail
        },
        // 币种详情
        {
          path: 'tokenDetail',
          name: 'tokenDetail',
          component: tokenDetail
        }

      ]
    },
    // 登录
    {
      path: '/login',
      component: Login
    }
  ]
})

export default router
