async function settingsRoutes(fastify, options) {
    fastify.get('/settings', async (request, reply) => {
        return {page: 'settings'};
    });
}

export default settingsRoutes