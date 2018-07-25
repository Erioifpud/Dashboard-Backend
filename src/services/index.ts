import Router from 'koa-router'

import apiV1 from './v1'

const routes = new Router()

apiV1(routes, '/v1')

export default routes
