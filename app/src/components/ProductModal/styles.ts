import styled from "styled-components/native";

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items:flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const Header = styled.View`
  margin: 24px;
`;

export const ModalBody = styled.View`
    flex: 1;
`;

export const IngredientsContainer = styled.View`
  margin: 24px;
`;

export const Ingredient = styled.View`
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;
  padding: 16px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const Footer = styled.View`
  min-height: 110px;
  background: #fff;
  padding: 16px 24px;
  margin: 32px 0 24px;
  justify-content: flex-end;
`;

export const FooterContainer = styled.SafeAreaView`
  flex-direction: row;
  justify-content: space-between;
`;

export const PriceContainer = styled.View``;
