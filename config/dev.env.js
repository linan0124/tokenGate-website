'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 测试库 172.16.0.181:8080 http://192.11.9.68:8080
  BASE_API: '"https://test_back.daocoin.money/"'
})
