import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./src/entity/User"
import { Blog } from "./src/entity/Blog"
import { Widget } from "./src/entity/Widgets"

export const AppDataSource = new DataSource(
    {
        type: "mysql",
        synchronize: true,
        logging: false,
        host: "localhost",
        port: 3306,
        username: "jasir",
        password: "jasir-blog",
        database: "blog",
        entities: [User,Blog,Widget],
        migrations: [],
        subscribers: [],
    }
)
