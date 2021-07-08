'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:9001"',
  OSS_PATH: '"https://online-edu-2021-06.oss-cn-guangzhou.aliyuncs.com"'
})
