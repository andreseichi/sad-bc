const Admin = require('../models/admin')
const MessageCodes = require('../../shared/messageCodes')
const HttpCodes = require('../httpCodes')
const { tokenSign, tokenVerify } = require('../util/utils')

// Autenticação - Receber token
async function auth(ctx) {
  const { adminName, password, rememberMe } = ctx.request.body
  let adm
  try {
    adm = await Admin.where({ adminName }).fetch()
  } catch (err) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: err
      }
    })
  }

  if (adm) {
    try {
      await adm.authenticate(password)
      const token = tokenSign(adm.toJSON(), rememberMe)
      ctx.status = HttpCodes.OK
      ctx.body = { adm, token }
    } catch (err) {
      ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errPasswordMismatch)
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('admin')
    )
  }
}

// Autorização - Obter acesso a recursos da API
function authz(ctx, next) {
  const authorization = ctx.headers.authorization
  if (!authorization) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errNotAuthorized)
  }
  const token = authorization.split(' ')[1]
  try {
    tokenVerify(token)
    return next()
  } catch (err) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnAuthz)
  }
}

module.exports = { auth, authz }
