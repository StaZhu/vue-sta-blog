(function (factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else {
    console.log('不受支持')
  }
})(function () {
  'use strict'

  const fs = require('fs')
  const path = require('path')
  const Sequelize = require('sequelize')
  const config = require('./config')

  const commentList = {}

  commentList.set = async function (info) {
    try {
      const response = await Model.create(info)
    } catch (err) {
      console.log(err)
    }
  }

  commentList.get = async function (id) {
    try {
      const response = await Model.findAndCountAll({
        where: {
          comment_post_ID: id
        }
      })
      const count = response.count
      const result = response.result
    } catch (err) {
      console.log(err)
    }
  }

  const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 30000
    },
    define: {
      timestamps: false
    }
  })

  const Model = sequelize.define('comment', {
    comment_ID: {
      type: Sequelize.BIGINT(20).UNSIGNED,
      // autoIncrement: true,
      // primaryKey: true,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    comment_post_ID: {
      type: Sequelize.BIGINT(20).UNSIGNED,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    comment_author: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
      validate: {
        len: [1, 20],
        notContains: '<script>'
      }
    },
    comment_author_email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 30],
        notContains: '<script>'
      }
    },
    comment_author_url: {
      type: Sequelize.STRING(200),
      allowNull: true,
      validate: {
        isUrl: true,
        notContains: '<script>'
      }
    },
    comment_author_IP: {
      type: Sequelize.STRING(100),
      allowNull: false,
      validate: {
        isIP: true
      }
    },
    comment_date_timezone: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        min: -12,
        max: 12
      }
    },
    comment_date_gmt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    comment_content: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notContains: '<script>'
      }
    },
    comment_karma: {
      type: Sequelize.INTEGER(11),
      allowNull: false,
      defaultValue: 0
    },
    comment_approved: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    comment_agent: {
      type: Sequelize.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        notContains: '<script>'
      }
    },
    comment_type: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: 0
    },
    comment_parent: {
      type: Sequelize.BIGINT(20),
      allowNull: false,
      defaultValue: -1
    }
  })

  Model.sync()

  Model.create({
    comment_ID: 0,
    comment_post_ID: 12,
    comment_author: 'sta\'s daddy',
    comment_author_email: '552037511@qq.com',
    comment_author_IP: '117.83.131.136',
    comment_date_timezone: -8,
    comment_content: '爸爸来留言',
    comment_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 1nger/6.5.20 NetType/WIFI Language/zh_CN',
    comment_parent: 0
  }).then(value => {
    // console.log(value)
  }).catch(err => {
    console.log(err)
  })

  Model.findAll({
    where: {
      comment_author: 'sta\'s daddy'
    }
  }).then(users => {
    console.log(users)
  })

  return articleList