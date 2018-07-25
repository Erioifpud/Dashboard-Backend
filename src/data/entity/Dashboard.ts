import {Entity, Column, ManyToMany} from 'typeorm'
import BaseEntity from "./BaseEntity"
import Role from "./Role"

@Entity()
export default class Dashboard extends BaseEntity {
  @Column({length: 32})
  name: string

  @Column()
  code: number

  @Column()
  itemIcon: string

  @Column()
  itemName: string

  @Column()
  itemUrl: string
}