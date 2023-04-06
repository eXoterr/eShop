import { BaseLogger } from "./base.js"
import { ConsoleLogger } from "./console.js"

class Logger
{
    private static instance: BaseLogger

    private static lvl: number = 0

    public static set level(lvl: number)
    {
        if(lvl < 0)
        {
            throw new Error("level must be grater or equal 0")
        }
        if(lvl > 3)
        {
            throw new Error("level must be less or equal 3")
        }
        this.lvl = lvl
    }

    public static get level(): number
    {
        return this.lvl
    }

    public static start()
    {
        if(!this.instance)
        {
            this.instance = new ConsoleLogger() // Logger initialization
            this.debug("logger started")
        }
    }

    public static info(message: string)
    {
        if(this.lvl >= 2)
        {
            this.instance.info(message)
        }
    }
    public static warn(message: string)
    {
        if(this.lvl >= 1)
        {
            this.instance.warn(message)
        }
    }
    public static error(message: string)
    {
        if(this.lvl >= 0)
        {
            this.instance.error(message)
        }
    }
    public static debug(message: string)
    {
        if(this.lvl >= 3)
        {
            this.instance.debug(message)
        }
    }
}

export {Logger}