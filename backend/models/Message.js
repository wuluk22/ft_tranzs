import sequelize from '../config/database-config.js';

import {DataTypes, Model} from 'sequelize';

class Message extends Model {}

Message.init(
    {
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Chat',
                key: 'id',
            },
            onDelete: 'CASCADE'
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Player',
                key: 'id',
            },
            onDelete: 'SET NULL'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Message',
        timestamps: true
    }
);

export default Message;