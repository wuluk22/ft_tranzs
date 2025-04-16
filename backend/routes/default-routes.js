async function defaultRoutes(fastify, options) {
    fastify.get('/', async (request, reply) => {
        return {page: 'default'};
    });
}

export default defaultRoutes