import ProductItem from "../ProductItem/ProductItem";
import Loading from "../Loading/Loading";
import useProducts from "../../Hooks/useProducts";
import Search from "../Search/Search";
import { useState } from "react";
import NotFoundProduct from "../../assets/imgs/U5kB4601.svg";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";  

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState(""); // New state for sorting
  const { data: products, isLoading, isError, error } = useProducts();

  function search(e) {
    setSearchTerm(e.target.value);
  }

  function handleSort(e) {
    setSortOption(e.target.value);
  }

  // Filter products based on search term
  let filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Apply sorting
  if (sortOption === "price-low") {
    filteredProducts?.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    filteredProducts?.sort((a, b) => b.price - a.price);
  } else if (sortOption === "name") {
    filteredProducts?.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "rating") {
    filteredProducts?.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Search search={search} searchTerm={searchTerm} />

      {/* Sorting Dropdown */}
      <div className="flex justify-end mt-4">
        <select
          className="p-2 border border-green-500 rounded-md shadow-md bg-white dark:bg-gray-800 dark:text-white"
          onChange={handleSort}
          value={sortOption}
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="rating">Rating: High to Low</option>
        </select>
      </div>

      {filteredProducts?.length > 0 ? (
        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {filteredProducts.map((p) => (
            <motion.div
              key={p._id}
              className="transform transition-all hover:scale-105 duration-300"
              whileHover={{ scale: 1.05 }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <ProductItem product={p} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center mt-10">
          <h3 className="text-green-600 italic">No products found</h3>
          <img src={NotFoundProduct} alt="No products found" />
        </div>
      )}
    </>
  );
}

export default Products;
