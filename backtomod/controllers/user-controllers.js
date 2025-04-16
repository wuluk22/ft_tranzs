import User from '../models/User.js';

const createUser = async (data) => {
    return User.findOrCreate({
        where: {
            name: data.name,
            email: data.email
        },
        defaults: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    });
};

export default createUser;