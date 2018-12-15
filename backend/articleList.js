/*!
 * articleList.js v1.0.0
 * (c) 2018 Sta Z
 * Released under the MIT License.
 * Date: 2018-12-2T0:38Z
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

  const fs = require('fs')
  const path = require('path')

  const articleList = {
    lists: {
      files: []
    }
  }

  articleList.init = function (pathDir) {
    updateList(pathDir, this.lists.files)
    addWatcher(pathDir, this.lists.files)
  }

  articleList.getResult = function () {
    return this.lists
  }

  function addWatcher (pathDir, files) {
    fs.watch(pathDir, function (event, filename) {
      console.log('事件变化: ' + event)
      if (!filename.includes('.DS_Store')) {
        console.log('改变的文件: ' + filename)
        updateList(pathDir, files)
      } else {
        console.log('没有文件名')
      }
    })
  }

  async function updateList (pathDir, files) {
    try {
      const temp = []
      const names = await getNames(pathDir)
      for (let i = 0; i < names.length; i++) {
        const pathFile = path.resolve(pathDir, names[i])
        if (await isEffectiveFile(pathFile)) {
          const info = await getInfo(pathFile, pathDir, '.md')
          if (info) temp.push(info)
        }
      }
      sortByDate(temp)
      generateIndex(temp)
      files.splice(0, files.length)
      temp.forEach(value => {
        files.push(value)
      })
      console.log('Article列表已更新')
    } catch (err) {
      console.log(err)
    }
  }

  function sortByDate (files) {
    for (let i = 0; i < files.length - 1; i++) {
      for (let j = 0; j < files.length - 1 - i; j++) {
        const dateBefore = Date.parse(files[j].year + '/' + files[j].month + '/' + files[j].day)
        const dateAfter = Date.parse(files[j + 1].year + '/' + files[j + 1].month + '.' + files[j + 1].day)
        if (dateBefore < dateAfter) {
          let temp = files[j]
          files[j] = files[j + 1]
          files[j + 1] = temp
        }
      }
    }
  }

  function generateIndex (files) {
    files.forEach((file, index) => {
      file.index = files.length - index
    })
  }

  function getNames (pathDir) {
    return new Promise((resolve, reject) => {
      fs.readdir(pathDir, (err, files) => {
        if (err) {
          reject(err)
        } else {
          resolve(files)
        }
      })
    })
  }

  function isEffectiveFile (pathFile) {
    return new Promise((resolve, reject) => {
      fs.stat(pathFile, (err, stats) => {
        if (err) {
          reject(err)
        } else if (stats.isFile() && path.extname(pathFile) === '.md') {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  function getInfo (pathFile, pathDir, type) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathFile, (err, data) => {
        if (err) {
          reject(err)
        }
        const text = data.toString()
        const regTitle = /`英文标题(:|：)([^`]+)`/g
        const regDate = /`写于(:|：)(\d{4})-(\d{1,2})-(\d{1,2})`/g
        const titleMatched = text.match(regTitle) ? text.match(regTitle)[0] : null
        const dateMatched = text.match(regDate) ? text.match(regDate)[0] : null
        if (titleMatched && dateMatched) {
          const info = {}
          info.name = path.basename(pathFile, type)
          info.title = titleMatched.replace(regTitle, '$2')
          info.url = path.join(path.sep, path.basename(pathDir), path.basename(pathFile))
          info.year = dateMatched.replace(regDate, '$2')
          info.month = dateMatched.replace(regDate, '$3')
          info.day = dateMatched.replace(regDate, '$4')
          resolve(info)
        } else {
          resolve(null)
        }
      })
    })
  }

  return articleList
})
