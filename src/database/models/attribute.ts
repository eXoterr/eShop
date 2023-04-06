import { Model, Sequelize, DataTypes } from "sequelize";
import { Good } from "./good.js";

class Attribute extends Model {
    public static connect(connection: Sequelize)
    {
        Attribute.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING
                },
                value: {
                    type: DataTypes.TEXT,
                    allowNull: false
                },
            },
            {
                sequelize: connection,
                modelName: 'Attribute'
            }
        )   
    }
    public static associate()
    {
        Attribute.belongsTo(Good)
    }
}


export {Attribute}