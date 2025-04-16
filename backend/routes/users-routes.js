import User from '../models/User.js';

async function usersRoutes(app) {
    // Define the GET /users route
    app.get('/users', async (request, reply) => {
        try {
            const users = await User.findAll(); // Fetch all users from the database
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ message: 'Failed to fetch users', error });
        }
    });
}

export default usersRoutes;