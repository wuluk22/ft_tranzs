import User from "../models/User.js";
import auth from "../services/auth-services.js";
import s from "fluent-json-schema";

const LOGIN_BODY = s.object()
  .prop("email", s.string().format("email").required())
  .prop("password", s.string().minLength(8).required());

const loginRoutes = async (fastify) => {
  fastify.post("/login", { schema: { body: LOGIN_BODY } }, async (req, reply) => {
    try {
      const user = await User.findOne({ where: { email: req.body.email } });

      if (!user || !(await auth.compare(req.body.password, user.password))) {
        return reply.status(401).send({ message: "Invalid email or password" });
      }

      reply.status(200).send({
        message: "Login successful",
        user: {
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          isAdmin: user.isAdmin,
          isBanned: user.isBanned,
        },
      });
    } catch (error) {
      reply.status(400).send({ message: "Failed to log in", error });
    }
  });
};

export default loginRoutes;