<template>
  <div id="app">
    <Header/>
    <Main/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  components: {
    Header,
    Main
  },
  created () {
    const ua = window.navigator.userAgent.toLowerCase()
    if (ua.includes('micromessenger')) {
      const wxRequest = (url) => {
        return new Promise((resolve, reject) => {
          const request = new XMLHttpRequest()
          request.onload = function () {
            if (this.status === 200) {
              resolve(this.response)
            } else {
              reject(new Error(this.response))
            }
          }
          url = encodeURIComponent(url)
          request.open('GET', '/api/weixin/authorizations?url=' + url, true)
          request.send()
        })
      }
      const url = window.location.href
      wxRequest(url).then(value => {
        const result = JSON.parse(value)
        wx.config({
          debug: false,
          appId: result.appId,
          timestamp: result.timestamp,
          nonceStr: result.nonceStr,
          signature: result.signature,
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'scanQRCode']
        })
        wx.ready(function () {
        })
        wx.error(function (res) {
          alert(JSON.stringify(res))
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  left: 0;
  font-size: 625%;
}
</style>
