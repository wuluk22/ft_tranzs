import fastifyStatic from "@fastify/static";
import path from "path";

async function defaultRoutes(fastify, options) {
  fastify.register(fastifyStatic, {
    root: "/app/public",
    prefix: "/",
  });

  fastify.setNotFoundHandler((req, reply) => {
    return reply.sendFile("index.html");
  });
}

export default defaultRoutes;
