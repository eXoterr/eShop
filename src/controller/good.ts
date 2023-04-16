import { Request, Response } from "express"
import { Good } from "../database/models/good.js"
import { requestGuard } from "../middleware/guard.js"
import { body, query, validationResult } from "express-validator"
import { Logger } from "../logger/logger.js"

class GoodsListController
{
    private static validators = [
        query("page").default(0).optional().isNumeric()
    ]

    private static async goodsList(req: Request, resp: Response)
    {
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return resp.status(400).json(errors.array())
        }

        try // Pagination
        {
            const goods = await Good.findAll({limit: 20, offset: (Number(req.query['page'] || 0)) * 20})
            return resp.status(200).json(goods)
        }
        catch(e)
        {
            Logger.error(`unable to get data from db: ${e}`)
            return resp.status(500)
        }

        
    }

    /**
     * Returns validators and controller
    */
    public static controller()
    {
        return [...this.validators, this.goodsList]
    }
}

class GoodAddController
{
    private static validators = [
        requestGuard,
        body("name").notEmpty().isLength({min: 3, max: 25}),
        body("price").notEmpty().isNumeric(),
        body("picture").isLength({max: 255}),
        body("description").notEmpty()
    ]

    private static async addGood(req: Request, resp: Response)
    {
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return resp.status(400).json(errors.array())
        }

        const goods = await Good.create({
            name: req.body.name,
            price: req.body.price,
            picture: req.body.picture,
            description: req.body.description
        })

        return resp.status(200).json(goods)
    }

    /**
     * Returns validators and controller
    */
    public static controller()
    {
        return [...this.validators, this.addGood]
    }
}

class GoodRemoveController
{
    private static validators = [
        requestGuard,
        body("id").notEmpty().isNumeric(),
    ]

    private static async removeGood(req: Request, resp: Response)
    {
        const errors = validationResult(req)

        if (!errors.isEmpty())
        {
            return resp.status(400).json(errors.array())
        }

        const exists = await Good.findOne({
            where: {
                id: req.body.id
            }
        })

        if (!exists)
        {
            return resp.status(404).json({
                error: "entity not found"
            })
        }


        await Good.destroy({
            where: {
                id: req.body.id
            } 
        })

        return resp.status(200).json({
            result: "ok"
        })
    }

    /**
     * Returns validators and controller
    */
    public static controller()
    {
        return [...this.validators, this.removeGood]
    }
}

export {GoodsListController, GoodAddController, GoodRemoveController}