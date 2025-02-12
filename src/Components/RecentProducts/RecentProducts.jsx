import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import Search from "../Search/Search";
import { useState } from "react";
import NotFoundProduct from "../../assets/imgs/U5kB4601.svg";

function RecentProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const { data: products, isLoading, isError, error } = useProducts();

  function search(e) {
    setSearchTerm(e.target.value);
  }

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...(filteredProducts || [])].sort((a, b) => {
    if (sortOption === "priceLowHigh") {
      return a.price - b.price;
    }
    if (sortOption === "priceHighLow") {
      return b.price - a.price;
    }
    if (sortOption === "rating") {
      return b.ratingsAverage - a.ratingsAverage;
    }
    if (sortOption === "nameAZ") {
      return a.title.localeCompare(b.title);
    }
    if (sortOption === "nameZA") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3 className="text-red-500">{error}</h3>;
  }

  return (
    <>
      {/* Search Bar */}
      <Search search={search} searchTerm={searchTerm} />

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          value={sortOption}
          onChange={handleSort}
          className="p-2 rounded-md border border-gray-300 bg-white shadow-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="default">Sort by</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="nameAZ">Name: A-Z</option>
          <option value="nameZA">Name: Z-A</option>
        </select>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {sortedProducts.map((p) => (
            <ProductItem key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h3 className="text-green-600 italic">No products found</h3>
          <img src={NotFoundProduct} alt="No products found" />
        </div>
      )}
    </>
  );
}

export default RecentProducts;
