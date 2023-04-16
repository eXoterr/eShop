import { Response, Request } from "express"
import { Logger } from "../logger/logger.js"

/**
 * Logs request's path and requester's ip
 * to default logger
*/
const requestLogger = (req: Request, resp: Response, next: Function) =>
{
    Logger.debug(`request at \"${req.path}\" from \"${req.ip}\"`)
    next()
}

export {requestLogger}