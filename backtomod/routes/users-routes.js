import User from "../models/User.js";

const usersRoutes = async (fastify, options) => {
  // Fetch all users
  fastify.get("/users", async (request, reply) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] }, // Exclude sensitive data
      });
      reply.send(users);
    } catch (error) {
      reply.status(500).send({ message: "Failed to fetch users", error });
    }
  });

  // Fetch a specific user by email
  fastify.get("/users/:email", async (request, reply) => {
    try {
      const user = await User.findOne({
        where: { email: request.params.email },
        attributes: { exclude: ["password"] }, // Exclude sensitive data
      });
      if (!user) {
        return reply.status(404).send({ message: "User not found" });
      }
      reply.send(user);
    } catch (error) {
      reply.status(500).send({ message: "Failed to fetch user", error });
    }
  });

  // Update a specific user by email
  fastify.put("/users/:email", async (request, reply) => {
    try {
      const updated = await User.update(request.body, {
        where: { email: request.params.email },
      });
      if (updated[0] === 0) {
        return reply.status(404).send({ message: "User not found" });
      }
      reply.send({ message: "User updated successfully" });
    } catch (error) {
      reply.status(500).send({ message: "Failed to update user", error });
    }
  });

  // Delete a specific user by email
  fastify.delete("/users/:email", async (request, reply) => {
    try {
      const deleted = await User.destroy({
        where: { email: request.params.email },
      });
      if (!deleted) {
        return reply.status(404).send({ message: "User not found" });
      }
      reply.send({ message: "User deleted successfully" });
    } catch (error) {
      reply.status(500).send({ message: "Failed to delete user", error });
    }
  });
};

export default usersRoutes;