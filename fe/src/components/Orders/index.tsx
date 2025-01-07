import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';


const orders: Order[] = [
    {
		"_id": "677bf19f724f9d816e38aa16",
		"table": "1234",
		"status": "WAITING",
		"products": [
			{
				"product": {
					"name": "Pizza quatro queijos",
					"imagePath": "1734550734185--quatro-queijos.png",
					"price": 40,
				},
                "quantity": 2,
				"_id": "677bf19f724f9d816e38aa17"
			},
			{
				"product": {
					"name": "Coca cola lata",
					"imagePath": "1734551749146--coca-cola.png",
					"price": 7,
				},
                "quantity": 5,
				"_id": "677bf19f724f9d816e38aa18"
			}
		],

	}
];
export function Orders() {
    return (
        <Container>
            <OrdersBoard
                icon="⏰"
                title="Fila de Espera"
                orders={orders}
            />
            <OrdersBoard
                icon="👨‍🍳"
                title="Em Preparação"
                orders={[]}
            />
            <OrdersBoard
                icon="✅"
                title="Pronto !!"
                orders={[]}
            />
        </Container>
 
    );
}