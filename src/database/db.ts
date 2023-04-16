import sequelize, { Sequelize } from "sequelize"
import { User } from "./models/user.js"
import { Good } from "./models/good.js"
import { Attribute } from "./models/attribute.js"


class DB
{
    private db: Sequelize

    constructor()
    {
        this.db = new Sequelize(
            {
                dialect: "postgres",
                host: process.env.DB_HOST || "127.0.0.1",
                port: Number(process.env.DB_PORT || 5432),
                username: process.env.DB_USER || "postgres",
                password: process.env.DB_PASS || "12345",
                database: process.env.DB_NAME || ""
            }
        )
    }

    private models = [ // Models list
        User,
        Good,
        Attribute
    ]

    /**
     * Adds model to ORM
    */
    private initModels()
    {
        for(let model of this.models)
        {
            model.connect(this.db)
        }
    }

    /**
     * Creates relations of models in ORM
    */
    private assoicateModels()
    {
        for(let model of this.models)
        {
            model.associate()
        }
    }

    /**
     * Syncs table declarations to DB server
    */
    private async syncModels()
    {
        await this.db.sync({alter: true})
    }

    /**
     * Prepares connection and connects to db
    */
    public async connect()
    {
        await this.db.authenticate()
        this.initModels()
        this.assoicateModels()
        await this.syncModels()
    }
}

export default DB