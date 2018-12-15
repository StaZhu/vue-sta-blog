/*!
 * wxToken.js v1.0.0
 * (c) 2018 Sta Z
 * Released under the MIT License.
 * Date: 2018-11-27T22:24Z
 */

(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    console.log('暂不支持AMD')
    /* define(factory) */
  } else {
    console.log('不支持浏览器')
  }
})(function () {
  'use strict'

  const crypto = require('crypto')
  const axios = require('axios')

  const wxToken = {
    appID: '',
    appSecret: '',
    accessToken: '',
    jsApiTicket: ''
  }

  wxToken.init = function (appID, appSecret) {
    this.appID = appID
    this.appSecret = appSecret
    this.getAuthorizations()
    // 一小时更新一次
    setInterval(this.getAuthorizations.bind(this), 3600000)
  }

  wxToken.getResult = function (url) {
    const querys = {}
    querys.jsapi_ticket = this.jsApiTicket
    querys.noncestr = this.getNonceStr()
    querys.timestamp = this.getTimestamp()
    querys.url = url
    const result = {}
    result.signature = this.getSignature(querys)
    result.timestamp = querys.timestamp
    result.nonceStr = querys.noncestr
    result.appId = this.appID
    result.url = url
    return result
  }

  wxToken.getAuthorizations = async function () {
    try {
      this.accessToken = await this.getAccessToken()
      this.jsApiTicket = await this.getJsApiTicket()
    } catch (err) {
      console.log(err)
    }
  }

  wxToken.getAccessToken = async function () {
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + this.appID + '&secret=' + this.appSecret
    const response = await axios.get(url)
    if (response.data.access_token) {
      return response.data.access_token
    } else {
      return Promise.reject(response.data.errmsg)
    }
  }

  wxToken.getJsApiTicket = async function () {
    const url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + this.accessToken + '&type=jsapi'
    const response = await axios.get(url)
    if (response.data.ticket) {
      return response.data.ticket
    } else {
      return Promise.reject(response.data.errmsg)
    }
  }

  wxToken.getNonceStr = function () {
    return Math.random().toString(36).substr(2, 15)
  }

  wxToken.getTimestamp = function () {
    return parseInt(new Date().getTime() / 1000)
  }

  wxToken.getSignature = function (querys) {
    console.log(querys)
    const queryString = this.getQueryString(querys)
    return crypto.createHash('sha1').update(queryString).digest('hex')
  }

  wxToken.getQueryString = function (object) {
    let keys = Object.keys(object).sort()
    let querys = {}
    keys.forEach(function (key) {
      querys[key.toLowerCase()] = object[key]
    })
    let queryString = ''
    for (let key in querys) {
      queryString += '&' + key + '=' + querys[key]
    }
    queryString = queryString.substr(1)
    return queryString
  }

  return wxToken
})
