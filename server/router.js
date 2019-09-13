const Router = require('koa-router')
const BodyParser = require('koa-body')
const unless = require('koa-unless')

const messageCodes = require('../shared/messageCodes')
const { validator, paginatedEntity, query } = require('./util/middlewares')
const frontend = require('./routes/frontend')
const HttpCodes = require('./httpCodes')

// Entities routes
const adminRoutes = require('./routes/admin')
const equipmentRoutes = require('./routes/equipments')

// Auth* routes
const { auth, authz } = require('./routes/auth')

const router = new Router()
const api = new Router({ prefix: '/api' })
const bodyParser = BodyParser()

// api middlewares

/**
 * Authentication
 */

api.post('/auth', bodyParser, validator('auth'), auth)

/**
 * Use middleware de autorização (authz) em todas as
 * rotas, exceto autenticação (funcionários), e GET /knowledgeAreas,
 * GET /academicUnities e criação de registro
 * de ficha catalográfica (usuários finais)
 */
authz.unless = unless
api.use(
  authz.unless({
    custom: ctx => {
      return ctx.path.includes('auth')
    }
  })
)

/**
 * Admin
 */

// create
api.post(
  '/admin/',
  bodyParser,
  validator('admin', 'create'),
  adminRoutes.create
)

// list
api.get('/admin/', adminRoutes.list)

// toggle active
api.put(
  '/admin/:adminName',
  bodyParser,
  validator('admin', 'update'),
  adminRoutes.update
)

/**
 * Equipment
 */

// create
api.post(
  '/equipments/',
  bodyParser,
  validator('equipments', 'create'),
  courseRoutes.create
)

// list
api.get('/equipments/', query(['id']), equipmentRoutes.list)

// update
api.put(
  '/equipments/:id',
  bodyParser,
  validator('equipments', 'update'),
  equipmentRoutes.update
)

// delete
api.del('/equipments/:id', equipmentRoutes.del)

// api not found
api.use('/*', ctx => {
  ctx.status = HttpCodes.NOT_FOUND
  ctx.body = messageCodes.error.errNotFound
})

router.use(api.routes())

// frontend rendering
router.get('*', frontend.render)

module.exports = router
