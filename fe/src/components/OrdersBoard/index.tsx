import { Board, OrderContainer } from "./styles";
import { Order } from "../../types/Order";
import { OrderModal } from "../OrderModal";
import { useState } from "react";

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Order[];
}

export function OrdersBoard ({ icon, title, orders }: OrdersBoardProps) { //consertar erro de tipagem any com isso

    const [isModalVisible, setIsModalVisible] = useState(false); //state sao valores atualizados|Generics 
    const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

    function handleOpenModal(order: Order) {
        setIsModalVisible(true);
        setSelectedOrder(order);
    }

    function handleCloseModal() {
        setIsModalVisible(false);
        setSelectedOrder(null);
    }

    return (
            <Board>
                <OrderModal  
                
                visible={ isModalVisible } 
                order={selectedOrder}
                onClose={handleCloseModal}/> 

                <header>
                    <span>{icon}</span>
                    <strong>{title}</strong>
                    <span> ({ orders.length }) </span>
                </header>

                {orders.length > 0 && (//renderização msm cois de um if alogo true, ja q o 0 é false //outra funcao chama o handle modal para verficar qual pedido e
                    <OrderContainer>
                    {orders.map((order) => (
                        <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>                  
                            <strong>Mesa {order.table}</strong>
                            <span>{order.products.length} itens</span>
                        </button>
                    ))}
                </OrderContainer>   
                )}
            </Board>
    );
}