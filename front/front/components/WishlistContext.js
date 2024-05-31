import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext({});

export function WishlistContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [wishlistProducts, setWishlistProducts] = useState([]);

  useEffect(() => {
    if (wishlistProducts?.length > 0) {
      ls?.setItem("wishlist", JSON.stringify(wishlistProducts));
    }
  }, [ls, wishlistProducts]);

  useEffect(() => {
    if (ls && ls.getItem("wishlist")) {
      setWishlistProducts(JSON.parse(ls.getItem("wishlist")));
    }
  }, [ls]);

  function addToWishlist(productId) {
    setWishlistProducts((prev) => [...prev, productId]);
  }

  function removeProductWishlist(productId) {
    setWishlistProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearWishlist() {
    setWishlistProducts([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistProducts,
        addToWishlist,
        removeProductWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
