import sequelize from '../config/database-config.js';
import auth from '../services/auth-services.js';
import Player from './Player.js';

import {DataTypes, Model} from 'sequelize';

class User extends Model {}

User.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        email: {
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
            allowNull: false,
            defaultValue: './img/defaultAvatar.png'
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

User.beforeCreate(async (user) => {
    user.password = await auth.hash(user.password);
});

User.afterCreate(async (user) => {
    await Player.create({userId: user.id});
});

export default User;