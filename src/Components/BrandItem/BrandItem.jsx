import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../Loading/Loading';

export default function BrandItem({ brand }) {
  const [specificBrand, setSpecificBrand] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch specific brand details
  async function getSpecificBrand(brandId) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setSpecificBrand(data.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {/* Brand Card */}
      <div
        className="border border-gray-300 rounded-xl shadow-md bg-white cursor-pointer transition-transform transform hover:-translate-y-2 hover:shadow-xl p-4 flex flex-col items-center text-center"
        onClick={() => getSpecificBrand(brand._id)}
      >
        <img
          src={brand?.image}
          alt={brand?.name}
          className="w-24 h-24 object-contain rounded-full mb-3"
        />
        <p className="text-lg font-semibold text-gray-700">{brand?.name}</p>
      </div>

      {/* Loading Screen Before Modal Appears */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Loading />
        </div>
      )}

      {/* Specific Brand Modal */}
      {isModalOpen && specificBrand && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:bg-gray-200 p-2 rounded-full"
            >
              ✖
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center text-center">
              <img
                src={specificBrand.image}
                alt={specificBrand.name}
                className="w-28 h-28 object-contain rounded-full shadow-md mb-4"
              />
              <h2 className="text-2xl font-bold text-green-600">{specificBrand.name}</h2>
              <p className="text-gray-500">{specificBrand.slug}</p>
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
