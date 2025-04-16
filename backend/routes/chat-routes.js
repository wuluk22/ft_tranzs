import s from 'fluent-json-schema'

const CHAT_BODY = s.object()
    .prop('chatId', s.integer().minimum(1).required())
    .prop('playerId', s.integer().minimum(1).required())
    .prop('content', s.string().minLength(1).maxLength(255).required());

const CHAT_SCHEMA = {body: CHAT_BODY};

const chatRoutes = async (fastify) => {
    fastify.post('/chat', {schema: CHAT_SCHEMA}, async (req, res) => {
        res.status(200).send(req.body);
    });
};

export default chatRoutes;