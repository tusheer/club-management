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
        app = await initModules(app);
        app.get('/', (req, res) => {
            res.send('Hello World!');
        });
        app.use(handleError);
        return app;
    };

    try {
        await configureRoutes(app);
        app.listen(port, async () => {
            console.log('server is running on port', port);
            await connectWithDb();
        });
    } catch (error) {}
};

app.listen(port, () => {
    console.log(`Club Member management app is running on port ${port}.`);
});
