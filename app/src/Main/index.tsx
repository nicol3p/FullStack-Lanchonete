import { Text } from "../components/Text";
import React from "react";
import { Container, CategoriesContainer, MenuContainer, Footer, FooterContainer } from "./styles";

import { Header } from "../components/Header";
import { Menu } from "../components/Menu/index"
import { Categories } from "../components/Categories";
import { Button } from "../components/Button/index"

export function Main() {
  return (
    <>
        <Container>
          <Header />
          <CategoriesContainer>
            <Categories />
          </CategoriesContainer>

          <MenuContainer>
            <Menu />
          </MenuContainer>

        </Container>

        <Footer>
          <FooterContainer>
            <Button onPress={() => alert('novo pedido')}>Novo Pedido</Button>
          </FooterContainer>
        </Footer>
    </>
  );
}
