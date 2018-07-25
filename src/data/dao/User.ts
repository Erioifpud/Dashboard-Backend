import {getManager} from 'typeorm'
import User from '../entity/User'
import {RoleDao} from "./Role"

export const UserDao = {
  getUserByName: async (name: string) => {
    const entityManager = getManager()
    return entityManager.findOne(User, { username: name })
  },
  getUser: async (user: User) => {
    const entityManager = getManager()
    return entityManager.findOne(User, user)
  },
  saveUser: async (user: User) => {
    const entityManager = getManager()
    return entityManager.save(User, user)
  }
}