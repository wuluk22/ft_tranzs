import User from "../models/User.js";
import s from "fluent-json-schema";

const REGISTER_BODY = s.object()
  .prop("name", s.string().minLength(2).maxLength(16).required())
  .prop("email", s.string().format("email").required())
  .prop("password", s.string().minLength(8).required());

const registerRoutes = async (fastify) => {
  fastify.post("/register", { schema: { body: REGISTER_BODY } }, async (req, reply) => {
    try {
      const user = await User.create(req.body);
      reply.status(201).send({
        message: "User registered successfully",
        user: {
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isAdmin: user.isAdmin,
          isBanned: user.isBanned,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        reply.status(409).send({ message: "Email or username already exists" });
      } else {
        reply.status(400).send({ message: "Failed to register user", error });
      }
    }
  });
};

export default registerRoutes;