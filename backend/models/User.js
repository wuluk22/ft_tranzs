import sequelize from "../config/database-config.js";
import {DataTypes, Model} from 'sequelize';

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        mail: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        isBanned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        bannedAt: {
            type: DataTypes.DATE
        },
        bannedTill: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true
    }
);

export default User;