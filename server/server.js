import express from 'express';
import { renderToString } from 'react-dom/server';
import htmlRenderer from '../helpers/htmlRenderer';
import MainPage from '../components/MainPage';

const app = express();

app.get('/api', (req, res) => {
    res.send({ message: 'I am a server route and can also be hot reloaded!' });
});

app.get('/', (req, res) => {
    const application = renderToString(<MainPage />);
    const htmlRendererIntance = new htmlRenderer({ application });

    res.send(htmlRendererIntance.getHtml());
});

export default app;
