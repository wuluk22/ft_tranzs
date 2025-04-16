import chatRoutes from './chat-routes.js';
import defaultRoutes from './default-routes.js';
import gameRoutes from './game-routes.js';
import loginRoutes from './login-routes.js';
import registerRoutes from './register-routes.js';
import settingsRoutes from './settings-routes.js';
import usersRoutes from './users-routes.js';

async function routes(app) {
    app.register(chatRoutes);
    app.register(defaultRoutes);
    app.register(gameRoutes);
    app.register(loginRoutes);
    app.register(registerRoutes);
    app.register(settingsRoutes);
    app.register(usersRoutes);
}

export default routes;

