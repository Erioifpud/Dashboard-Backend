import {Entity, Column, ManyToMany, OneToMany, JoinTable} from 'typeorm'
import User from './User'
import BaseEntity from "./BaseEntity"
import Dashboard from "./Dashboard"

@Entity()
export default class Role extends BaseEntity {
  @Column({length: 32})
  name: string

  @OneToMany(type => User, user => user.role)
  users: User[]

  @ManyToMany(type => Dashboard)
  @JoinTable({name: 'role_dashboard'})
  dashboards: Dashboard[]
}
