import { Router } from "express"
import { BaseRouter } from "./base.js"
import { RegisterController } from "../controller/register.js"
import { LoginController } from "../controller/login.js"
import { requestGuard } from "../middleware/guard.js"

/**
 * User authorization and authentication
 * Routes
*/
class AuthRouter extends BaseRouter
{
    private guards = [
        requestGuard
    ]

    constructor()
    {
        super()
        
        this.instance = Router() // Creates new router

        this.setupRoutes()
    }

    public get router(): Router
    {
        return this.instance
    }

    /**
     * Registers routes in created router
    */
    protected setupRoutes()
    {
        this.instance.post('/register', RegisterController.controller())
        this.instance.post('/login', LoginController.controller())
    }
}

export {AuthRouter}