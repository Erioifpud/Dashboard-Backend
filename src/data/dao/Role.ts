import {getManager} from 'typeorm'
import Role from '../entity/Role'

export const RoleDao = {
  getRoleById: (id: number) => {
    const entityManager = getManager()
    return entityManager.findOne(Role, id)
  }
}