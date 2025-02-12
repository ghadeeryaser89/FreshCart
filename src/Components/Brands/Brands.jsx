import { Helmet } from 'react-helmet';
import useBrands from '../../Hooks/useBrands';
import BrandItem from '../BrandItem/BrandItem';
import Loading from '../Loading/Loading';

function Brands() {
  const { data: brands, isLoading, isError, error } = useBrands();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h3 className="text-red-600 text-lg font-semibold bg-white px-6 py-3 rounded-lg shadow-md">
          {error}
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Helmet>
        <title>Brands</title>
      </Helmet>

      {/* HEADER WITH GRADIENT */}
      <h1 className="text-center text-4xl font-extrabold bg-gradient-to-r from-green-400 to-green-500 text-transparent bg-clip-text drop-shadow-lg mb-10 animate-fade-in">
        Discover Our Top Brands
      </h1>

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {brands.map((b) => (
          <div 
            key={b._id}
            className="p-4 bg-white rounded-2xl shadow-lg transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <BrandItem brand={b} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brands;
