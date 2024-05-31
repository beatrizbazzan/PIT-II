import ProductBox from "@/components/ProductBox";
import { useState } from "react";
import styled from "styled-components";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const SearchBar = styled.input`
  padding: 5px;
  width: 100%;
  margin-bottom: 20px;
`;

export default function ProductsGrid({ products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryMap, setCategoryMap] = useState({
    "664e3b22eb54fc690252cec2": "coffee",
    "664ff94de33498048cafcdf0": "latte",
    "664ff90be33498048cafcde8": "frappuccino",
    "664ff97ae33498048cafcdf4": "chocolate",
    "664ff9afe33498048cafcdfc": "tea",
    "664ff9bce33498048cafce03": "tea latte",
    "664ff9ebe33498048cafce07": "sandwich",
    "664ffa02e33498048cafce0b": "vegan sanwiches",
    "664ffa78e33498048cafce1e": "cakes",
    "664ffa21e33498048cafce0f": "cookies",
    "664ffac1e33498048cafce26": "bloomers",
    "664ffa72e33498048cafce1a": "muffin",
    "664ffa82e33498048cafce22": "glazed",
    "664ff99be33498048cafcdf8": "refreshers",
    "664ff915e33498048cafcdec": "smoothie",
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (!selectedCategory || product.category === selectedCategory)
  );

  return (
    <div>
      <div className="flex justify-center align-middle">
        <div className="pr-5">
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-darkgreen block w-full p-2"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">all</option>
            {Object.entries(categoryMap).map(([categoryId, categoryName]) => (
              <option key={categoryId} value={categoryId}>{categoryName}</option>
            ))}
          </select>
        </div>
        <SearchBar
          type="text"
          className="text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="seach products by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <StyledProductsGrid>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductBox key={product._id} {...product} />
          ))
        ) : (
          <p className="text-xl border-l-darkgreen">no products found...</p>
        )}
      </StyledProductsGrid>
    </div>
  );
}