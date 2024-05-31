import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Link from "next/link";
import { useContext } from "react";
import styled from "styled-components";

const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  color:inherit;
  text-decoration:none;
  margin:0;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceRow = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

export default function ProductBox({_id,title,description,price,images}) {
  const {addProduct} = useContext(CartContext);
  const url = '/product/'+_id;
  return (
    <ProductWrapper className="border border-spacing-1 border-[#4C4C4C] border-opacity-30 rounded-xl">
      <a href={`/product/${_id}`}>
        <div className="@apply h-[120px] text-center flex items-center justify-center p-5 rounded-[10px] bg-[#00382b] mt-1">
          <img src={images?.[0]} alt="" className="max-h-20 max-w"/>
        </div>
      </a>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            ${price}
          </Price>
          <Button onClick={() => addProduct(_id)} primary>
            add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}