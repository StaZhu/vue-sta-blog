/*!
 * photoList.js v1.0.0
 * (c) 2018 Sta Z
 * Released under the MIT License.
 * Date: 2018-12-6T0:25Z
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
  const sharp = require('sharp')

  const articleList = {
    lists: {
      bundles: []
    }
  }

  articleList.init = function (pathDir) {
    updateList(pathDir, this.lists.bundles)
    addWatcher(pathDir, this.lists.bundles)
  }

  articleList.getResult = function () {
    return this.lists
  }

  async function updateList (pathDir, files) {
    try {
      const temp = []
      const namesSubDir = await getNames(pathDir)
      for (let i = 0; i < namesSubDir.length; i++) {
        const pathSubDir = path.resolve(pathDir, namesSubDir[i])
        if (await isDir(pathSubDir)) {
          const infoSubDir = await getInfoSubDir(pathSubDir)
          if (infoSubDir) {
            const index = temp.push(infoSubDir) - 1
            const namesFile = await getNames(pathSubDir)
            for (let i = 0; i < namesFile.length; i++) {
              const pathFile = path.resolve(pathSubDir, namesFile[i])
              if (await isEffectiveFile(pathFile, '.jpg')) {
                const info = await getInfo(pathFile, pathSubDir)
                if (info) temp[index].files.push(info)
              }
            }
          }
        }
      }
      sortByDate(temp)
      generateIndex(temp)
      files.splice(0, files.length)
      temp.forEach(value => {
        files.push(value)
      })
      console.log('Photo列表已更新')
    } catch (err) {
      console.log(err)
    }
  }

  async function addWatcher (pathDir, files) {
    fs.watch(pathDir, { recursive: true }, function (event, filename) {
      console.log('事件变化: ' + event)
      if (!filename.includes('.DS_Store')) {
        console.log('改变的文件: ' + filename)
        updateList(pathDir, files)
        // _.debounce(updateList, 5000).call(this, pathDir, files)
      } else {
        console.log('没有文件名')
      }
    })
  }

  function sortByDate (files) {
    for (let i = 0; i < files.length - 1; i++) {
      for (let j = 0; j < files.length - 1 - i; j++) {
        const dateBefore = Date.parse(files[j].date)
        const dateAfter = Date.parse(files[j + 1].date)
        if (dateBefore < dateAfter) {
          let temp = files[j]
          files[j] = files[j + 1]
          files[j + 1] = temp
        }
      }
    }
  }

  function generateIndex (files) {
    files.forEach((file, index, arr) => {
      file.index = files.length - index
      const key = Object.keys(file)
      key.unshift('index')
      const newFile = {}
      for (let i = 0; i < key.length; i++) {
        newFile[key[i]] = file[key[i]]
      }
      arr[index] = newFile
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

  function isDir (pathSubDir) {
    return new Promise((resolve, reject) => {
      fs.stat(pathSubDir, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve(stats.isDirectory())
        }
      })
    })
  }
  function isEffectiveFile (pathFile, type) {
    return new Promise((resolve, reject) => {
      fs.stat(pathFile, (err, stats) => {
        if (err) {
          reject(err)
        } else {
          resolve(stats.isFile() && path.extname(pathFile).toLowerCase() === type.toLowerCase())
        }
      })
    })
  }

  function getInfoSubDir (pathSubDir) {
    return new Promise((resolve, reject) => {
      const pathMeta = path.resolve(pathSubDir, 'meta.json')
      fs.readFile(pathMeta, (err, data) => {
        if (err) {
          reject(err)
        }
        const meta = JSON.parse(data)
        const info = {}
        info.title = meta.title
        info.substract = meta.substract
        info.date = meta.date
        info.files = []
        resolve(info)
      })
    })
  }

  function getInfo (pathFile, pathSubDir) {
    return new Promise((resolve, reject) => {
      sharp(pathFile).metadata().then(value => {
        const info = {}
        info.url = path.join(path.parse(pathSubDir).dir.replace(/.+\/dist(\/.+)/, '$1'), path.basename(pathSubDir), path.basename(pathFile))
        info.surl = path.join(path.parse(pathSubDir).dir.replace(/.+\/dist(\/.+)/, '$1'), path.basename(pathSubDir), '/small', path.basename(pathFile))
        info.name = path.basename(pathFile, path.extname(pathFile))
        info.width = value.width
        info.height = value.height
        resolve(info)
      }).catch(err => {
        reject(err)
      })
    })
  }

  return articleList
})
