import { Model, Sequelize, DataTypes } from "sequelize";
import { Good } from "./good.js";

class User extends Model {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare role: string;

    public static connect(connection: Sequelize)
    {
        User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                username: {
                    type: DataTypes.STRING,
                    unique: true
                },
                email: {
                    type: DataTypes.STRING,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING
                },
                role: {
                    type: DataTypes.ENUM,
                    values: ['USER', 'ADMIN'],
                    defaultValue: "USER"
                }
            },
            {
                sequelize: connection,
                modelName: 'User'
            }
        )
    }

    /**
     * Creates relations to other models
    */
    public static associate()
    {
        User.hasMany(Good)
    }
}


export {User}