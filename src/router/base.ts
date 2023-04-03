import { Router } from "express";

abstract class BaseRouter
{
    protected instance: Router
    
    constructor()
    {
        this.instance = Router()
    }
    abstract get router(): Router
    protected abstract setupRoutes(): void
}

export {BaseRouter}