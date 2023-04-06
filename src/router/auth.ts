import { Router } from "express"
import { BaseRouter } from "./base.js"
import { RegisterController } from "../controller/register.js"
import { LoginController } from "../controller/login.js"
import { requestGuard } from "../middleware/guard.js"

class AuthRouter extends BaseRouter
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
        this.instance.post('/register', RegisterController.controller())
        this.instance.post('/login', LoginController.controller())
    }
}

export {AuthRouter}