import { useEffect } from 'react';
import  closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { FormatCurrency } from '../../utils/FormatCurrency';
import { ModalBody, Overlay, OrderDetails, Actions } from "./styles";


interface OrderModalProps {
    visible: boolean;
    order: Order | null;
    onClose: () => void;
}

export function OrderModal({ visible, order, onClose}: OrderModalProps) {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    if (!visible || !order) {
        return null;
    }

    //let total = 0;
    //order.products.forEach(({ product, quantity}) => { OUUUUUU
    //    total += product.price * quantity;
    //})

    const total = order.products.reduce(( total, { product, quantity }) => { //fica retornando o valor no acumulador (total)
        return total + (product.price * quantity);
    }, 0);


    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>Mesa {order.table}</strong>
                    
                    <button type="button" onClick={onClose}>
                        <img src={closeIcon} alt="icon de fechar"></img>
                    </button>
                </header>

                <div className="status-container">
                    <small>Status do Pedido</small>
                    <div>
                        <span>
                            {order.status === 'WAITING' && '⏰'}
                            {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
                            {order.status === 'DONE' && '✅'}
                        </span>
                        <strong>
                            {order.status === 'WAITING' && 'Fila de Espera'}
                            {order.status === 'IN_PRODUCTION' && 'Em Preparação'}
                            {order.status === 'DONE' && 'Pronto !!'}
                        </strong>
                    </div>
                </div>

                <OrderDetails>
                    <small>Itens</small>

                    <div className='order-items'>

                        {order.products.map(({ _id, product, quantity }) => (
                            <div className='item' key={_id}>
                                <img src={`http://localhost:3001/upload/${product.imagePath}`} 
                                    alt={product.name}
                                    width="56"
                                    height="28.51" 
                                />

                                <span className='quantity'>{quantity}x</span>

                                <div className='product-details'>
                                    <strong>{product.name}</strong>
                                    <span>{FormatCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}

                    </div>

                    <div className='total'>
                        <span>Total</span>
                        <strong>{FormatCurrency(total)}</strong>
                    </div>
                </OrderDetails>

                <Actions>
                    <button className='primary'>
                        <span>👨‍🍳</span>
                        <span>Iniciar Produção</span>
                    </button>

                    <button className='secundary'>
                        <span>Cancelar Pedidos</span>
                    </button>
                </Actions>
            </ModalBody>
        </Overlay>
    );
}