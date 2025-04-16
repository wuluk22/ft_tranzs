import Sequelize from 'sequelize';
import path from 'path';
import fs from 'fs';

const PROGRAM_MODE = process.env.PROGRAM_MODE || 'development';

let storageType;

if (PROGRAM_MODE !== 'development') {
    storageType = path.join(process.cwd(), 'data');

    if (!fs.existsSync(storageType)) {
        fs.mkdirSync(storageType);
    }
} else {
    storageType = ':memory:';
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: storageType,
    logging: false
});

export default sequelize;