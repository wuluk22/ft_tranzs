import sequelize from '../config/database-config.js';

import {DataTypes, Model} from 'sequelize';

class ChatParticipant extends Model {}

ChatParticipant.init(
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
            allowNull: false,
            references: {
                model: 'Player',
                key: 'id',
            },
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        modelName: 'ChatParticipant',
        timestamps: true
    }
);

export default ChatParticipant;