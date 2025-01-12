import { FlatList } from "react-native";

import { products } from "../../mocks/products";
import { Text } from "../Text";
import React from "react";

import { Product, ProductImage, ProductDetails} from "./styles";
import { FormatCurrency } from "../../utils/FormatCurrency";

export function Menu() {
  return(
    <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <Product>
            <ProductImage
              source={{
                uri: `http://192.168.0.106:3001/upload/${product.imagePath}`,
              }}

            />

            <ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#666" style={{ marginVertical: 8 }} >{product.description}</Text>
              <Text size={14} weight="600">{FormatCurrency(product.price)}</Text>
            </ProductDetails>
          </Product>
        )}
    />
  );
}
