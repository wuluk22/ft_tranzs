import sequelize from '../config/database-config.js';

import {DataTypes, Model} from 'sequelize';

class Player extends Model {}

Player.init(
    {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        experiencePoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        tournamentWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gameWon: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        gameLoosed: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        longestStreak: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        modelName: 'Player',
        timestamps: true
    }
);

export default Player;