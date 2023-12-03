import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/route.js';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(router);

app.listen(3000, () => console.log('server run on port 3000'));
