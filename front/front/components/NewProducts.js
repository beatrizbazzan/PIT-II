import Center from "@/components/Center";
import ProductsGrid from "@/components/ProductsGrid";
import styled from "styled-components";

const Title = styled.h2`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({products}) {
  return (
    <Center>
      <Title>new arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}