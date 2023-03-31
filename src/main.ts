import express, {Express} from "express"
import config from "./config.js"
import DB from "./database/db.js"
import { ConsoleLogger } from "./logger/console.js"
import { Logger } from "./logger/logger.js"

class App
{
    private db: DB
    private server: Express
    public static logger: Logger

    constructor()
    {
        this.setupLogger()
        config.readConfig()
        this.server = express()
        this.db = new DB()
    }

    public async start()
    {
        try
        {
            await this.db.connect()
        }
        catch (e)
        {
            App.logger.error(`unable to connect to db: ${e}`)
            return
        }
        
        const port = process.env.PORT || 5000

        try
        {
            this.server.listen(
                port,
                () => App.logger.info(`listening at port: ${port}`)
            )
        }
        catch (e)
        {
            App.logger.error(`unable to start server: ${e}`)
            return
        }
    }

    private setupLogger()
    {
        const cLogger = new ConsoleLogger()
        const logger = new Logger(cLogger)
        App.logger = logger
    }
}

const app = new App()
app.start()