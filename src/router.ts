import { Router } from 'express';

import { listCategories } from './app/UseCase/Categories/listCategories';
import { createCategory } from './app/UseCase/Categories/createCategories';

export const router = Router();

//list categorys

    router.get('/categories', listCategories);

//create category

    router.post('/categories', createCategory);


//list products

    router.get('/products', (req, res) => {
        res.send('OK');
    });


//create products

    router.post('/products', (req, res) => {
        res.send('OK');
    });

//get products by category

    router.get('/categories/:categoryId/products', (req, res) => {
        res.send('OK');
    });

//list orders

    router.get('/orders', (req, res) => {
        res.send('OK');
    });

//create order

    router.post('/orders', (req, res) => {
        res.send('OK');
    });

//change order status

    router.patch('/orders/:ordersId', (req, res) => { //patch-alteração parcial status ou put-alteração complesta
        res.send('OK');
    });

//delete/cancel order

    router.delete('/orders/:ordersId', (req, res) => { //patch-alteração parcial status ou put-alteração complesta
        res.send('OK');
    });
