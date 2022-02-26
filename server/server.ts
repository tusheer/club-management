import dotenv from 'dotenv';
import { app, connectWithDb } from './core/index';
import { handleRequest, handleError } from './middlewares';
import initModules from './modules';
import { Express } from 'express';
dotenv.config();

const port = process.env.PORT || 4000;

const start = async (): Promise<void> => {
    const configureRoutes = async (app: Express): Promise<Express> => {
        app.use(handleRequest);
        app.use(handleError);
        app = await initModules(app);
        return app;
    };

    try {
        await configureRoutes(app);
        app.listen(port, async () => {
            console.log('server is running on port', port);
            // await connectWithDb();
        });
    } catch (error) {
        console.log('error');
    }
};

start();
