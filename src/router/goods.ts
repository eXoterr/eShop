import { Router } from "express"
import { BaseRouter } from "./base.js"
import { RegisterController } from "../controller/register.js"
import { LoginController } from "../controller/login.js"
import { requestGuard } from "../middleware/guard.js"
import { GoodAddController, GoodRemoveController, GoodsListController } from "../controller/good.js"

class GoodsRouter extends BaseRouter
{
    private guards = [
        requestGuard
    ]

    constructor()
    {
        super()
        
        this.instance = Router()

        this.setupRoutes()
    }

    public get router(): Router
    {
        return this.instance
    }

    protected setupRoutes()
    {
        this.instance.get('/', GoodsListController.controller())
        this.instance.post('/add', GoodAddController.controller())
        this.instance.delete('/remove', GoodRemoveController.controller())
    }
}

export {GoodsRouter}