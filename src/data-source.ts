import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

export const AppDataSource = new DataSource(
    {
        type: "mysql",
        synchronize: true,
        logging: false,
        host: "localhost",
        port: 3306,
        username: "blog",
        password: "blog-app",
        database: "blog",
        entities: [User],
        migrations: [],
        subscribers: [],
    }
)
