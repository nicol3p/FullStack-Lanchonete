import { Text } from "../components/Text";
import React, { useState } from "react";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu/index"
import { Categories } from "../components/Categories";
import { Button } from "../components/Button/index"
import { TableModal } from "../components/TableModal";

export function Main() {

  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');

    function handleSaveTable(table: string) {
      setSelectedTable(table);
    }

    function handleCancelOrder () {
      setSelectedTable('');
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
            <Menu />
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
