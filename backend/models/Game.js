import sequelize from "../config/database-config.js";
import {DataTypes, Model} from 'sequelize';

class Game extends Model {}

Game.init(
    {
        winnerId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Player',
                key: 'id'
            },
            onDelete: 'SET NULL'
        },
        playedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'Game',
        timestamps: true
    }
);

export default Game;