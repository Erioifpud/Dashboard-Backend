import result from './result'
import {UserDao} from "../../data/dao"
import User from "../../data/entity/User"
import {RoleDao} from "../../data/dao/Role"
import {Login, Register} from "./state"
import {DashboardDao} from "../../data/dao/Dashboard"
const bcrypt = require('bcryptjs')

async function test (ctx) {
  if (ctx.session.user) {
    ctx.body = result(0, '已登录', ctx.session.dashboards)
  } else {
    ctx.body = result(1, '未登录')
  }
}

async function register (ctx) {
  const params = ctx.request.body
  const existedUser = await UserDao.getUserByName(params.username)
  console.log(existedUser)
  if (!existedUser) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(params.password, salt)
    let user = new User()
    user.username = params.username
    user.role = await RoleDao.getRoleById(2)
    user.hash = hash
    UserDao.saveUser(user)
    ctx.body = result(Register.REG_SUCCESS, '注册成功')
  } else {
    ctx.body = result(Register.NAME_DUPLICATE, '用户名重复')
  }
  // ctx.body = result(Register.UNKNOWN, '未知错误')
}

async function login (ctx) {
  const params = ctx.request.body
  const user = await UserDao.getUser(params)
  if (user) {
    if (bcrypt.compareSync(params.password, user.hash)) {
      ctx.session.user = user
      ctx.session.dashboards = await DashboardDao.getDashboardsByUser(user)
      ctx.body = result(Login.LOGIN_SUCCESS, '登录成功')
    }
  } else {
    ctx.body = result(Login.WRONG, '用户名或密码错误')
  }
}

export default (routes: any, prefix: string) => {
  routes.get(prefix + '/public/test/', test)
  routes.post(prefix + '/public/register', register)
  routes.post(prefix + '/public/login', login)
}