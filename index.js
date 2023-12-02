import bodyParser from 'body-parser';
import express from 'express';
import router from './routes/route.js';

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.listen(3000, () => console.log('server run on port 3000'));
