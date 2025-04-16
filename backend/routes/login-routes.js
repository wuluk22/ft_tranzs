async function loginRoutes(fastify, options) {
    fastify.get('/login', async (request, reply) => {
        return {page: 'login'};
    });
}

export default loginRoutes