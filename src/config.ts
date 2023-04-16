import dotenv from "dotenv"

/**
 * Configures application
*/
function readConfig()
{
    dotenv.config() // Load config from env
}

export default {readConfig}