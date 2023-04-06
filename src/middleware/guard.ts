import { Response, Request } from "express"
import { Logger } from "../logger/logger.js"
import jsonwebtoken from "jsonwebtoken"

const requestGuard = (req: Request, resp: Response, next: Function) =>
{
    if (!req.headers?.authorization)
    {
        return resp.status(403).send("no auth token provided")
    }

    try 
    {
        jsonwebtoken.verify(req.headers?.authorization.split(' ')[1], process.env.JWT_SECRET || "12345")
    }
    catch (e)
    {
        Logger.warn(`invalid jwt token from "${req.ip}"`)
        Logger.debug(String(e))
        return resp.status(403).send("invalid token provided")
    }


    next()
}

export {requestGuard}