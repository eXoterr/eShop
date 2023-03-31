import sequelize, { Sequelize } from "sequelize"



class DB
{
    private db: Sequelize

    constructor()
    {
        this.db = new Sequelize(
            {
                dialect: "postgres",
                host: process.env.DB_HOST || "127.0.0.1",
                port: parseInt(process.env.DB_PORT || "5432"),
                username: process.env.DB_USER || "postgres",
                password: process.env.DB_PASS || "12345",
                database: process.env.DB_NAME || ""
            }
        )
    }

    public async connect()
    {
        await this.db.authenticate()
    }
}

export default DB