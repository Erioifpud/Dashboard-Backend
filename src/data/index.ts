import { createConnection } from 'typeorm'
import initTable from './init'

export const initDataBase = async (app) => {
  createConnection({
    type     : 'mysql',
    host     : '127.0.0.1',
    port     : 3306,
    username : 'root',
    password : 'er123456',
    database : 'dashboard',
    entities: [ __dirname + '/entity/*.ts'/*, 'dist/data/entity/*.js'*/],
    logging: ['query', 'error'],
    synchronize: true,
  }).then((connection: any) => {
    console.log('数据库连接成功')
    // initTable(connection)
    app.listen(3333)
    console.log('应用启动成功')
    return true
  }).catch((error: any) => {
    console.log(error)
    console.log('数据库连接异常')
    return false
  })
}
