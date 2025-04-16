import sequelize from '../config/database-config.js';
import Chat from './Chat.js'
import ChatParticipant from './ChatParticipant.js'
import Game from './Game.js';
import GamePlayer from './GamePlayer.js';
import Message from './Message.js';
import Player from './Player.js';
import User from './User.js';

User.hasOne(Player, {foreignKey: 'userId'});
Player.belongsTo(User, {foreignKey: 'userId'});

Player.belongsToMany(Game, {through: GamePlayer, foreignKey: 'playerId'});
Game.belongsToMany(Player, {through: GamePlayer, foreignKey: 'gameId'});

Player.belongsToMany(Chat, {through: ChatParticipant, foreignKey: 'playerId'});
Chat.belongsToMany(Player, {through: ChatParticipant, foreignKey: 'chatId'});

Message.belongsTo(Player, {foreignKey: 'playerId'});
Message.belongsTo(Chat, {foreignKey: 'chatId'});

export default {sequelize, Chat, ChatParticipant, Game, GamePlayer, Message, Player, User};