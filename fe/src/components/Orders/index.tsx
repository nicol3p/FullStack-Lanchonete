import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';

export function Orders() {
    
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        api.get('/orders')
            .then(({ data }) => {
                console.log('API Response:', data);
                setOrders(data);
            });
    }, []);


    
      const waiting = orders.filter((order) => order.status === 'WAITING');
      const inProduction = orders.filter((order) => order.status === 'IN_PRODUCTION');
      const done = orders.filter((order) => order.status === 'DONE');
      console.log('Waiting Orders:', waiting);
      console.log('In Production Orders:', inProduction);
      console.log('Done Orders:', done);
    
    return (
        <Container>
            <OrdersBoard
                icon="⏰"
                title="Fila de Espera"
                orders={waiting}
            />
            <OrdersBoard
                icon="👨‍🍳"
                title="Em Preparação"
                orders={inProduction}
            />
            <OrdersBoard
                icon="✅"
                title="Pronto !!"
                orders={done}
            />
        </Container>
 
    );
}