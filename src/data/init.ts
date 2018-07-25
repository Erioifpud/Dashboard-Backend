import User from "./entity/User"
import Role from "./entity/Role"
import Dashboard from "./entity/Dashboard"

export default async (conn: any) => {
  let dashboard = new Dashboard()
  dashboard.code = 0
  dashboard.name = 'dashboard'
  dashboard.itemName = 'Dashboard'
  dashboard.itemIcon = 'analytics'
  dashboard.itemUrl = '/'

  let roleAdmin = new Role()
  roleAdmin.name = 'admin'
  roleAdmin.dashboards = [dashboard]

  let roleNone = new Role()
  roleNone.name = 'none'
  roleNone.dashboards = [dashboard]

  let user = new User()
  user.username = 'root'
  user.hash = 'root'
  user.role = roleAdmin

  let userRepo = conn.getRepository(User)
  let roleRepo = conn.getRepository(Role)
  let dashboardRepo = conn.getRepository(Dashboard)
  await dashboardRepo.save(dashboard)
  await roleRepo.save(roleAdmin)
  await roleRepo.save(roleNone)
  await userRepo.save(user)


}