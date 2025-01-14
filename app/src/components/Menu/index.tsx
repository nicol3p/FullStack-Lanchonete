import { FlatList, TouchableOpacity } from "react-native";

import { products } from "../../mocks/products";
import { Product } from "../../types/Product"
import { Text } from "../Text";
import React, { useState } from "react";

import { ProductContainer, ProductImage, ProductDetails, Separator, AddToCartButton } from "./styles";
import { FormatCurrency } from "../../utils/FormatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";

export function Menu() {

  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ selectedProduct, setSelectedProduct] = useState<  null | Product >(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product)
  }

  return(
    <>

    <ProductModal
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
      product={selectedProduct}
      ></ProductModal>

      <FlatList
          data={products}
          style={{marginTop: 32}}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          ItemSeparatorComponent={Separator}
          keyExtractor={product => product._id}
          renderItem={({ item: product }) => (
            <ProductContainer onPress={ () => setIsModalVisible(true)}>
              <ProductImage
                source={{
                  uri: `http://192.168.1.13:3001/upload/${product.imagePath}`,
                }}

              />

              <ProductDetails>
                <Text weight="600">{product.name}</Text>
                <Text size={14} color="#666" style={{ marginVertical: 8 }} >{product.description}</Text>
                <Text size={14} weight="600">{FormatCurrency(product.price)}</Text>
              </ProductDetails>


              <AddToCartButton>
                <PlusCircle />
              </AddToCartButton>
            </ProductContainer>

          )}
      />
    </>
  );
}
