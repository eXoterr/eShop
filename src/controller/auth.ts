import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { User } from "../database/models/user.js";
import bcryptjs from "bcryptjs"
import { Op } from "sequelize";
import { Logger } from "../logger/logger.js";

class AuthControllers
{
    public static async signUp(req: Request, resp: Response)
    {
        body("login").isLength({min: 3, max: 25})
        body("email").isEmail()
        body("password").isLength({min: 8, max: 60})

        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return resp.status(400).json(errors.array())
        }

        const emailExists = await User.findOne(
            {
                where: {
                    email: req.body.email
                }
            }
        )

        if (emailExists)
        {
            return resp.json({
                error: {
                    details: "email already registered"
                }
            })
        }

        const usernameExists = await User.findOne(
            {
                where: {
                    username: req.body.username
                }
            }
        )

        if (usernameExists)
        {
            return resp.json({
                error: {
                    details: "username already registered"
                }
            })
        }

        const hashedPassword = await bcryptjs.hash(req.body.password, 7)

        await User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            }
        )

        Logger.info(`registered user with username ${req.body.username} and email ${req.body.email}`)

        return resp.status(201).json({
            result: "ok"
        })
    }
}

export {AuthControllers}