import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

function CategoryItem({ category }) {
  const [subCategory, setSubCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchSubCategories() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${category?._id}/subcategories`
        );
        setSubCategory(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      } finally {
        setIsLoading(false);
      }
    }
    if (category?._id) {
      fetchSubCategories();
    }
  }, [category]);

  return (
    <div
      className="relative flex flex-col items-center gap-4 bg-white dark:bg-gray-800 p-6 max-w-sm mx-auto border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Image */}
      <div className="relative w-full">
        <img
          src={category?.image}
          alt={category?.name || "Category"}
          className="h-60 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
        <h3 className="text-green-600 dark:text-green-400 text-2xl font-bold text-center mt-4 capitalize">
          {category?.name}
        </h3>
      </div>

      {/* Subcategory Card */}
      <div
        className={`absolute left-full top-0 ml-4 w-52 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-600 z-10 transition-opacity duration-300 transform ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
        }`}
      >
        {isLoading ? (
          <Loading />
        ) : subCategory.length > 0 ? (
          subCategory.map((subC) => (
            <div key={subC._id} className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300">
              {subC.name}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">No subcategories available.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryItem;
