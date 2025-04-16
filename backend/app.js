import Fastify from "fastify";

import models from "./models/index.js";

import chatRoutes from "./routes/chat-routes.js";
import defaultRoutes from "./routes/default-routes.js";
import gameRoutes from "./routes/game-routes.js";
import loginRoutes from "./routes/login-routes.js";
import registerRoutes from "./routes/register-routes.js";
import settingsRoutes from "./routes/settings-routes.js";

const buildApp = async () => {
  const fastify = Fastify({
    logger: true,
  });

  await models.sequelize.sync({ force: true });

  fastify.register(chatRoutes);
  fastify.register(defaultRoutes);
  fastify.register(gameRoutes);
  fastify.register(loginRoutes);
  fastify.register(registerRoutes);
  fastify.register(settingsRoutes);

  return fastify;
};

export default buildApp;
