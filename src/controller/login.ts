import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../database/models/user.js";
import bcryptjs from "bcryptjs"
import { Op } from "sequelize";
import { Logger } from "../logger/logger.js";
import jsonwebtoken from "jsonwebtoken";

class LoginController
{
    private static validators = [
        body("username").notEmpty().isLength({min: 3, max: 25}),
        body("password").notEmpty().isLength({min: 8, max: 60})
    ]

    private static async signIn(req: Request, resp: Response)
    {
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return resp.status(400).json(errors.array())
        }

        const user = await User.findOne(
            {
                where: {
                    username: req.body.username
                }
            }
        )

        if (!user)
        {
            return resp.status(403).json({
                error: {
                    details: "login or password is not correct"
                }
            })
        }

        const passwordValid = await bcryptjs.compare(req.body.password, user.password)

        if (!passwordValid)
        {
            Logger.warn(`failed login from "${req.ip}" as "${req.body.username}"`)
            return resp.status(403).json({
                error: {
                    details: "login or password is not correct"
                }
            })
        }

        if (!process.env.JWT_SECRET)
        {
            Logger.warn("no JWT secret is set! using default \"12345\"")
        }

        const payload = jsonwebtoken.sign(user.toJSON(), process.env.JWT_SECRET || "12345")

        Logger.info(`success login from "${req.ip}" as "${req.body.username}"`)

        return resp.status(200).json({
            token: payload
        })
    }

    public static controller()
    {
        return [...this.validators, this.signIn]
    }
}

export {LoginController}