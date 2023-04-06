import express, {Express, json} from "express"
import config from "./config.js"
import DB from "./database/db.js"
import { Logger } from "./logger/logger.js"
import { requestLogger } from "./middleware/logger.js"
import { AuthRouter } from "./router/auth.js"
import { requestGuard } from "./middleware/guard.js"
import { GoodsRouter } from "./router/goods.js"
import cors from "cors"

class App
{
    private db: DB
    private server: Express

    constructor()
    {
        config.readConfig()

        Logger.level = Number(process.env.LOG_LEVEL || 0)
        Logger.start()

        this.db = new DB()

        this.server = express()
        this.server.use(json())
        this.server.use(cors())
        this.server.use(requestLogger)

    }

    public async start()
    {
        try
        {
            await this.db.connect()
        }
        catch (e)
        {
            Logger.error(`unable to connect to db: ${e}`)
            return
        }
        
        const port = process.env.PORT || 5000

        this.server.use('/', new GoodsRouter().router)
        this.server.use('/auth', new AuthRouter().router)

        try
        {
            this.server.listen(
                port,
                () => Logger.info(`listening at port: ${port}`)
            )
        }
        catch (e)
        {
            Logger.error(`unable to start server: ${e}`)
            return
        }
    }

}

const app = new App()
app.start()