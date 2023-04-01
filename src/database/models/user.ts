import { Model, Sequelize, DataTypes } from "sequelize";
import { Good } from "./good.js";


class User extends Model {
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
                    type: DataTypes.STRING
                },
                email: {
                    type: DataTypes.STRING
                },
                password: {
                    type: DataTypes.STRING
                },
                role: {
                    type: DataTypes.ENUM,
                    values: ['USER', 'ADMIN']
                }
            },
            {
                sequelize: connection,
                modelName: 'User'
            }
        )
    }
    public static associate()
    {
        User.hasMany(Good)
    }
}


export {User}