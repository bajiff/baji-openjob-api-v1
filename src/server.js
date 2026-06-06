import 'dotenv/config';
import process from 'process';
import express from 'express';

const app = express();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());

app.get('/', (req, res) => {
    res.send({ message: 'OpenJob RESTful API V1 is running with ES Modules!' });
});

app.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});