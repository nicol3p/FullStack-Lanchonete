import { model, Schema } from 'mongoose';

export const Order = model('Order', new Schema({
    table: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['WAITING', 'IN_PRODUCTION', 'DONE'], //apenas uma dessas opções
        default: ['WAITING'], //apartir que entar ja estara em andanmento
    },
    createdAt: {
        type: Date,
        default: Date.now(), //ordenação por data
    },
    products: {
        required: true,
        type: [{
            products: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'Products', //relacionamento
            }
        }]
    },
    quantity: {
        type: Number,
        default: 1, //se nao for enviado assume q tem 1
    }
}));
