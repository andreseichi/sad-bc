const Bookshelf = require('bookshelf')
const Knex = require('knex')
const bookshelfSecurePasswd = require('bookshelf-secure-password')

const env = process.env.NODE_ENV || 'development'
const knexConfig = require('../knexfile')[env]

const knex = Knex(knexConfig)
const bookshelf = Bookshelf(knex)

bookshelf.plugin('registry') // para que serve isso ?
bookshelf.plugin('pagination') // para que serve isso ?
bookshelf.plugin('visibility') // para que serve isso ?
bookshelf.plugin(bookshelfSecurePasswd)

module.exports = { bookshelf, knex }
