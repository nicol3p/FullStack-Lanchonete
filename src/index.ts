import express from 'express';
import mongoose from 'mongoose';
import { router } from './router';
import path from 'node:path';

mongoose.connect('mongodb://localhost:27017')
    .then(() => { //seria a conversão de um dado
        console.log('conectado ao mongo');
        const app = express();
        const port = 3001;

        app.use('/upload', express.static(path.resolve(__dirname, '..', 'upload')));
        app.use(express.json());
        app.use(router);

        app.listen(port, () => {
            console.log(`🙉 Server is running on http://localhost:${port}`);
        });
    })
    .catch(() => console.log('erro ao conectar no mongodb'));


//new version sem erro
