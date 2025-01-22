import { useEffect, useState } from 'react';
import socketIo  from 'socket.io-client';

import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { api } from '../../utils/api';  

export function Orders() {
    
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const socket = socketIo('http://localhost:3001', {
            transports: ['websocket'],
        });

        socket.on('order@new', (order) => {
            setOrders(prevState => prevState.concat(order));
        });
    }, []);

    useEffect(() => {
        api.get('/orders')
            .then(({ data }) => {
                console.log('API Response:', data);
                setOrders(data);
            });
    }, []);


    //nao pode 3 iogaol e nem identar do meu jeito
      const waiting = orders.filter((order) => order.status == 'WAITING');
      const inProduction = orders.filter((order) => order.status == 'IN_PRODUCTION');
      const done = orders.filter((order) => order.status == 'DONE');
      console.log('Waiting Orders:', waiting);
      console.log('In Production Orders:', inProduction);
      console.log('Done Orders:', done);
    
        function handleCancelOrder(orderId: string) {
            setOrders((prevState) => prevState.filter(order => order._id != orderId));
        }

        function handleOrderStatusChange (orderId: string, status: Order['status']) {
            setOrders((prevState) => prevState.map((order) => (
                order._id === orderId
                    ? { ...order, status }
                    : order
            )))
        }

    return (
        <Container>
            <OrdersBoard
                icon="⏰"
                title="Fila de Espera"
                orders={waiting}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="👨‍🍳"
                title="Em Preparação"
                orders={inProduction}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
            <OrdersBoard
                icon="✅"
                title="Pronto !!"
                orders={done}
                onCancelOrder={handleCancelOrder}
                onChangeOrderStatus={handleOrderStatusChange}
            />
        </Container>
 
    );
}