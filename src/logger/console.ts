import chalk from "chalk"
import { BaseLogger } from "./base.js"

class ConsoleLogger extends BaseLogger
{
    public info(message: string)
    {
        this.logMessage(chalk.blue("[INFO]"), message)
    }
    public warn(message: string)
    {
        this.logMessage(chalk.yellow("[WARN]"), message)
    }
    public error(message: string)
    {
        this.logMessage(chalk.red("[ERROR]"), message)
    }
    public debug(message: string)
    {
        this.logMessage(chalk.gray("[DEBUG]"), message)
    }

    private logMessage(prefix: string, message: string)
    {
        console.log(`[${new Date().toLocaleString()}] ${prefix} ${message}`)
    }
}

export {ConsoleLogger}