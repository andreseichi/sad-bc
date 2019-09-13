const Equipment = require('../models/equipment')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')

async function create(ctx) {
  const payload = ctx.request.body
  ctx.status = HttpCodes.OK
  try {
    const newEquipment = await Equipment.forge(payload).save()
    ctx.body = newEquipment
    ctx.status = HttpCodes.OK
    const id = newEquipment.id
    ctx.set('Location', `/api/equipments/${id}`)
  } catch (err) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbSave, {
      error: {
        rawErrorMessege: err
      }
    })
  }
}

async function list(ctx) {
  let query = Equipment
  const id = ctx.query.id
  if (id) {
    query = query.where({ id })
  }
  try {
    ctx.body = await query.fetchAll()
  } catch (err) {
    ctx.throw(HttpCode.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: err
      }
    })
  }
}

async function update(ctx) {
  const id = +ctx.params.id
  const payload = ctx.request.body
  let equipment = await Equipment.where({ id }).fetch()
  if (equipment) {
    try {
      equipment = await Equipment.where({ id }).save(payload, {
        patch: true
      })
      ctx.body = equipment
      ctx.status = HttpCodes.OK
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
      MessageCodes.error.errEntityDoesNotExist('Equipment')
    )
  }
}

async function del(ctx) {
  const id = +ctx.params.id
  const existingEquipment = await Equipment.where({ id }).fetch()
  if (!existingEquipment) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('Equipment')
    )
    return
  }
  try {
    await Equipment.where({ id }).destroy()
    ctx.status = HttpCodes.OK
  } catch (err) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbSave)
  }
}

module.exports = { create, list, update, del }
