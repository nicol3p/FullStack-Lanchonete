import { Request, Response } from 'express';

import { Product } from '../../models/Products';

export async function listProductsbyCategory(req: Request, res: Response) {

    try {

        const  { categoryId  } = req.params;

        const products = await Product.find().where('category').equals(categoryId); //listando todos os produtos  que a categoria for a mesma

        res.json(products);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}
