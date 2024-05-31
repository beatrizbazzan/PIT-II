import Header from "@/components/Header";
import Title from "@/components/Title";
import { WishlistContext } from "@/components/WishlistContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const WishlistContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;
`;

const ProductListItem = styled.li`
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export default function WishlistPage() {
  const { wishlistProducts, removeProductWishlist } = useContext(WishlistContext);
  const [products,setProducts] = useState([]);

  const handleRemoveProduct = (productId) => {
    removeProductWishlist(productId);
  };

  useEffect(() => {
    if (wishlistProducts.length > 0) {
      axios.post('/api/wishlist', {ids: wishlistProducts})
        .then(response => {
          setProducts(response.data);
        })
    } else {
      setProducts([])
    }
    }, [wishlistProducts]);

  return (
    <div>
      <Header />
      <WishlistContainer>
        <Title className="mb-3">Wishlist</Title>
        {wishlistProducts.length > 0 ? (
          <ProductList>
            {products.map((product) => (
              <ProductListItem key={product._id}>
                <button 
                  class="absolute bg-alertred hover:bg-alertred text-white font text-xs w-4 rounded-full"
                  onClick={() => handleRemoveProduct(product._id)}>
                  x
                </button>
                <a href={`/product/${product._id}`}>
                  <img className="rounded-lg" src={product.images[0]} alt="" />
                  <div>
                    <h1>{product.title}</h1>
                    <p>${product.price}</p>
                    <p className="text-xs pb-2">{product.description}</p>
                  </div>
                </a>
              </ProductListItem>
            ))}
          </ProductList>
        ) : (
          <p>your wish list is empty.</p>
        )}
      </WishlistContainer>
    </div>
  );
}