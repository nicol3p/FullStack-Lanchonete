import { Text } from "../components/Text";
import React, { useState } from "react";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer, CenteredContainer } from "./styles";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu/index";
import { Categories } from "../components/Categories";
import { Button } from "../components/Button/index";
import { TableModal } from "../components/TableModal";
import { Cart } from "../components/Cart";
import { CartItems } from "../types/CartItems";
import { Product } from "../types/Product";
import { ActivityIndicator } from "react-native";

import { products as mockProducts } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";

export function Main() {

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const [isLoading] = useState(false);
  const [products] = useState<Product[]>(mockProducts);

    function handleSaveTable(table: string) {
      setSelectedTable(table);
    }

    function handleResetOrder () {
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
            onCancelOrder={handleResetOrder}

          />

          {!isLoading && (
            <>
              <CategoriesContainer>
                <Categories />
              </CategoriesContainer>

              {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      onAddToCart={handleAddToCart}
                      products={products}
                    />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />

                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado
                    </Text>
                  </CenteredContainer>
                )
              }
            </>
          )}

          {isLoading && (
            <CenteredContainer>
              <ActivityIndicator color="#D73035" size="large" />
            </CenteredContainer>
          )}
        </Container>

        <Footer>
          <FooterContainer>
            {!selectedTable && (
              <Button onPress={() => {
                setIsTableModalVisible(true);}}
                disabled={isLoading}
              >
                Novo Pedido
              </Button>
            )}

            {selectedTable && (
              <Cart
                cartItems={cartItems}
                onAdd={handleAddToCart}
                onDecrement={handleDecrementCartItem}
                onConfirmOrder={handleResetOrder}
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

