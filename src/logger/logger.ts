import { IOutput } from "./types.js"


class Logger
{
    private output: IOutput

    constructor(output: IOutput)
    {
        this.output = output
    }

    public info(message: string)
    {
        this.output.info(message)
    }
    public warn(message: string)
    {
        this.output.warn(message)
    }
    public error(message: string)
    {
        this.output.error(message)
    }
    public debug(message: string)
    {
        this.output.debug(message)
    }
}



export {Logger}