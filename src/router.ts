import path from 'node:path'; //pacote nativo node

import { Router } from 'express';
import  multer  from 'multer';

import { listCategories } from './app/UseCase/Categories/listCategories';
import { createCategory } from './app/UseCase/Categories/createCategories';
import { listProducts } from './app/UseCase/Products/listProducts';
import { createProducts } from './app/UseCase/Products/createProducts';
import { listProductsbyCategory } from './app/UseCase/Categories/listProductsbyCategory';
import { listOrders } from './app/UseCase/Orders/listOrders';
import { createOrder } from './app/UseCase/Orders/createOrder';
import { cancelOrder } from './app/UseCase/Orders/cancelOrder';

import { changeOrderStatus } from './app/UseCase/Orders/changeOrderStatus';

export const router = Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback) {
            callback(null, path.resolve(__dirname, '..', 'upload')); //caminho inteiro do arquivo
        },
        filename(re, file, callback) {
            callback(null, `${Date.now()}--${file.originalname}`);
        }
    }),
});

//list categorys

    router.get('/categories', listCategories);

//create category

    router.post('/categories', createCategory);


//list products

    router.get('/products', listProducts);


//create products

    router.post('/products', upload.single('image'), createProducts);

//get products by category

    router.get('/categories/:categoryId/products', listProductsbyCategory);

//list orders

    router.get('/orders', listOrders);

//create order

    router.post('/orders', createOrder);

//change order status

    router.patch('/orders/:orderId', changeOrderStatus);

//delete or cancel

    router.delete('/orders/:orderId', cancelOrder);
