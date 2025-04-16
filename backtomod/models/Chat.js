import sequelize from '../config/database-config.js';

import {DataTypes, Model} from 'sequelize';

class Chat extends Model {}

Chat.init(
    {
        isPublic: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'Chat',
        timestamps: true
    }
);

export default Chat;