async function registerRoutes(fastify, options) {
    fastify.get('/register', async (request, reply) => {
        return {page: 'register'};
    });
}

export default registerRoutes