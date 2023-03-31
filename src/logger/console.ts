import chalk from "chalk"
import { IOutput } from "./types.js"

class ConsoleLogger implements IOutput
{
    public info(message: string)
    {
        console.log(`[${new Date().toLocaleString()}] ${chalk.blue("[INFO]")} ${message}`)
    }
    public warn(message: string)
    {
        console.log(`[${new Date().toLocaleString()}] ${chalk.yellow("[WARN]")} ${message}`)
    }
    public error(message: string)
    {
        console.log(`[${new Date().toLocaleString()}] ${chalk.red("[ERROR]")} ${message}`)
    }
    public debug(message: string)
    {
        console.log(`[${new Date().toLocaleString()}] ${chalk.gray("[DEBUG]")} ${message}`)
    }
}

export {ConsoleLogger}