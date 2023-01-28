import { DataSource } from "typeorm"
import { User } from "./entity/user.entity"
require('dotenv').config()

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    logging: false,
    synchronize: true,
    entities: [User],
    migrations: [],
    subscribers: [],
})
