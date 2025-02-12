import { Helmet } from 'react-helmet';
import useCategories from '../../Hooks/useCategories';
import CategoryItem from '../CategoryItem/CategoryItem';
import Loading from '../Loading/Loading';

function Categories() {
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <h3 className="text-red-500 text-center">{error}</h3>;
  }

  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 px-4 lg:px-0">
        {categories.map((c) => (
          <div
            key={c._id}
            className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md hover:shadow-lg transition-all p-4"
          >
            <CategoryItem category={c} className="w-full h-120 object-contain bg-gray-100 dark:bg-gray-700 p-2 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Categories;
