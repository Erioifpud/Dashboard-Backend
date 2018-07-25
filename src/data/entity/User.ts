import { Entity, Column, ManyToOne } from 'typeorm'
import Role from "./Role"
import BaseEntity from "./BaseEntity"

@Entity()
export default class User extends BaseEntity {
  @Column({length: 32})
  username: string

  @Column({length: 60})
  hash: string

  @ManyToOne(type => Role, role => role.users)
  role: Role
}