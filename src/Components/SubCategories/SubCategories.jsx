import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading";

function SubCategories() {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSubCategories() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`
        );
        setSubCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching subcategories", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubCategories();
  }, [categoryId]);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Subcategories</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {subCategories.length > 0 ? (
          subCategories.map((subC) => (
            <div key={subC._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-700">{subC.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No subcategories available.</p>
        )}
      </div>
    </div>
  );
}

export default SubCategories;
