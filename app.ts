import Koa from 'koa'
import log4js from 'koa-log4'
import routes from './src/services/index'
import {initDataBase} from './src/data'
import redis from './src/services/redis'
import session from 'koa-session2'
import cors from 'kcors'
import koaBody from 'koa-bodyparser'

log4js.configure({
  appenders: {
    console: {type: 'console'},
    app: {
      type: 'dateFile',
      filename: 'logs/app.log',
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: false,
      category: 'app',
      usefsync: true
    },
    db: {
      type: 'dateFile',
      filename: 'logs/db.log',
      pattern: '-yyyy-MM-dd',
      alwaysIncludePattern: false,
      category: 'db',
      usefsync: true
    },
  },
  categories: {
    default: {appenders: ['app', 'console', 'db'], level: 'error'}
  }
})
const logger = log4js.getLogger('app')

const app = new Koa()

app.use(log4js.koaLogger(logger, {level: 'auto'}))
app.use(cors({credentials: true}))
app.use(session({maxAge: 20 * 60 * 1000, store: new redis()}))
app.use(koaBody())

app.use(routes.routes())
app.use(routes.allowedMethods())

initDataBase(app)