import {PrimaryGeneratedColumn} from 'typeorm'

export default abstract class BaseEntity {
  constructor(id?: number) {
    if (id) {
      this.id = id
    }
  }

  @PrimaryGeneratedColumn()
  public id: number
}