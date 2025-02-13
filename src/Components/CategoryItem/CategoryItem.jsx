import { Link } from "react-router-dom";

function CategoryItem({ category }) {
  return (
    <Link to={`/subcategories/${category._id}`} className="block">
      <div className="relative flex flex-col items-center gap-4 bg-white dark:bg-gray-800 p-6 max-w-sm mx-auto border border-gray-200 dark:border-gray-600 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
        <img
          src={category?.image}
          alt={category?.name || "Category"}
          className="h-60 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
        />
        <h3 className="text-green-600 dark:text-green-400 text-2xl font-bold text-center mt-4 capitalize">
          {category?.name}
        </h3>
      </div>
    </Link>
  );
}

export default CategoryItem;
