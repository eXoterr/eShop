import { Router } from "express"
import { BaseRouter } from "./base.js"
import { RegisterController } from "../controller/auth.js"

class AuthRouter extends BaseRouter
{
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
    }
}

export {AuthRouter}