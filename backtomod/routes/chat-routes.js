async function chatRoutes(fastify, options) {
    fastify.get('/chat', async (request, reply) => {
        return {page: 'chat'};
    });
}

export default chatRoutes