import Slider from "react-slick";
import Loading from "../Loading/Loading";
import useCategories from "../../Hooks/useCategories";
import { useRef } from "react";

function CategorySlider() {
  const sliderRef = useRef(null);
  const { data: categories, isLoading, isError, error } = useCategories();

  if (isLoading) return <Loading />;
  if (isError) return <h3 className="text-red-500 text-center">{error}</h3>;
  if (!categories || categories.length === 0) return <Loading />;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full px-4 py-6">
      <Slider ref={sliderRef} {...settings} className="overflow-hidden">
        {categories.map((c) => (
          <div key={c._id} className="p-3">
            <div className="relative group">
              <img
                src={c.image}
                alt={c.name}
                className="h-[180px] w-full object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-5 group-hover:bg-opacity-10 transition-opacity"></div>
            </div>
            <h3 className="text-center text-green-700 dark:text-green-400 font-semibold mt-2 text-base">
              {c.name}
            </h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
