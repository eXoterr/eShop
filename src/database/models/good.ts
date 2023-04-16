import { Model, Sequelize, DataTypes } from "sequelize";
import { Attribute } from "./attribute.js";
import { User } from "./user.js";

class Good extends Model {
    public static connect(connection: Sequelize)
    {
        Good.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING
                },
                price: {
                    type: DataTypes.INTEGER,
                    defaultValue: 0,
                    allowNull: false
                },
                picture: {
                    type: DataTypes.TEXT,
                },
                description: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize: connection,
                modelName: 'Good'
            }
        )
        
    }

    /**
     * Creates relations to other models
    */
    public static associate()
    {
        Good.hasMany(Attribute)
        Good.belongsToMany(User, {through: "user_cart"})
    }
}


export {Good}