import Fastify from 'fastify';

import models from './models/index.js';
import routes from './routes/index.js';

const buildApp = async () => {
    const app = Fastify({
        logger: true
    });

    await models.sequelize.sync({force: true});
    await app.register(routes);

    return app;
};

export default buildApp;