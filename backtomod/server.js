import buildApp from './app.js';

const PORT = process.env.PORT || '3000';
const HOST = process.env.HOST || '0.0.0.0';

const start = async () => {
    try {
        const app = await buildApp();
        await app.listen({port: PORT, host: HOST});
    } catch (error) {
        console.log(error);
    }
};

start();