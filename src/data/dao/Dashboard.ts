import {getManager} from 'typeorm'
import User from "../entity/User"
import Role from "../entity/Role"

export const DashboardDao = {
  getDashboardsByUser: async (user: User) => {
    const entityManager = getManager()
    const fullUser: User = await entityManager.createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.id = :id', {id: user.id})
      .getOne()
    const fullRole: Role = await entityManager.createQueryBuilder(Role, 'role')
      .leftJoinAndSelect('role.dashboards', 'dashboards')
      .where('role.id = :id', {id: fullUser.role.id})
      .getOne()
    return fullRole.dashboards
  }
}