abstract class BaseLogger
{
    public abstract info(message: string): void
    public abstract warn(message: string): void
    public abstract error(message: string): void
    public abstract debug(message: string): void
}

export {BaseLogger}