const Admin = require('../models/admin')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')

async function create(ctx) {
  const payload = ctx.request.body
  const adminName = payload.adminName
  const existingAdmin = await Admin.where({ adminName }).fetch()
  if (existingAdmin) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityAlreadyExist('admin')
    )
    return
  }
  ctx.status = HttpCodes.OK
  const newAdmin = await Admin.forge(payload).save()
  ctx.set('Location', `/api/admin/${adminName}`)
  ctx.body = newAdmin
}

async function list(ctx) {
  try {
    ctx.body = await Admin.fetchAll()
  } catch (err) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: err
      }
    })
  }
}

async function update(ctx) {
  const adminName = ctx.params.adminName
  const payload = ctx.request.body
  let adm = await Admin.where({ adminName }).fetch()
  if (adm) {
    try {
      adm = await Admin.where({ adminName }).save(payload, {
        patch: true
      })
      ctx.status = HttpCodes.OK
      ctx.body = user
    } catch (err) {
      ctx.throw(HttpCodes.INT_SRV_ERROR, MessageCodes.error.errOnDbSave, {
        error: {
          rawErrorMessage: err
        }
      })
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('admin')
    )
  }
}

module.exports = { create, list, update }
