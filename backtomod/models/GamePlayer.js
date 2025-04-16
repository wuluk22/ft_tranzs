import sequelize from "../config/database-config.js";
import {DataTypes, Model} from 'sequelize';

class GamePlayer extends Model {}

GamePlayer.init(
    {
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Game',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        playerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Player',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        isWinner: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },
    {
        sequelize,
        modelName: 'GamePlayer',
        timestamps: true
    }
);

export default GamePlayer;