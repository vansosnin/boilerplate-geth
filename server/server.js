import express from 'express';
import routingMiddleware from './middlewares/routingMiddleware';

const app = express();

app.use(routingMiddleware);

export default app;
