import { Text } from "../components/Text";
import React, { useState } from "react";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu/index";
import { Categories } from "../components/Categories";
import { Button } from "../components/Button/index";
import { TableModal } from "../components/TableModal";
import { Cart } from "../components/Cart";
import { CartItems } from "../types/CartItems";
import { Product } from "../types/Product";

export function Main() {

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

    function handleSaveTable(table: string) {
      setSelectedTable(table);
    }

    function handleCancelOrder () {
      setSelectedTable('');
      setCartItems([]);
    }

    function handleAddToCart(product: Product) {
      if (!selectedTable) {
        setIsTableModalVisible(true);
      }

      setCartItems((prevState) => {
        const itemIndex = prevState.findIndex(
          cartItems => cartItems.product._id === product._id
        );

        if (itemIndex < 0 ) {
            return prevState.concat({ //adicionar
              quantity: 1,
              product,
            })
        }

        const newCartItems = [...prevState];
        newCartItems[itemIndex] = {
          ...newCartItems[itemIndex],
          quantity: newCartItems[itemIndex].quantity + 1,
        };

        return newCartItems;
      });
    }

    function handleDecrementCartItem(product: Product) {
      setCartItems((prevState) => {
        const itemIndex = prevState.findIndex(
          cartItems => cartItems.product._id === product._id
        );
        const newCartItems = [...prevState];
        const item = prevState[itemIndex];

        if (item.quantity === 1) {
          newCartItems.splice(itemIndex, 1); //remover um produto ple qbtd

          return newCartItems;
        }

        newCartItems[itemIndex] = {
          ...item,
          quantity: item.quantity - 1,
        };

        return newCartItems;

      });
    }
  return (
    <>
        <Container>
          <Header
            selectedTable={selectedTable}
            onCancelOrder={handleCancelOrder}

          />
          <CategoriesContainer>
            <Categories />
          </CategoriesContainer>

          <MenuContainer>
            <Menu onAddToCart={handleAddToCart} />
          </MenuContainer>

        </Container>

        <Footer>
          <FooterContainer>
            {!selectedTable && (
              <Button onPress={() => {
                setIsTableModalVisible(true);
              }}>
                Novo Pedido
              </Button>
            )}

            {selectedTable && (
              <Cart
                cartItems={cartItems}
                onAdd={handleAddToCart}
                onDecrement={handleDecrementCartItem}
              />
            )}
          </FooterContainer>
        </Footer>

        <TableModal
          visible={isTableModalVisible}
          onClose={() => setIsTableModalVisible(false)}
          onSave={handleSaveTable}
        />
    </>
  );
}

