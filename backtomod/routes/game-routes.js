async function gameRoutes(fastify, options) {
    fastify.get('/game', async (request, reply) => {
        return {page: 'game'};
    });
}

export default gameRoutes