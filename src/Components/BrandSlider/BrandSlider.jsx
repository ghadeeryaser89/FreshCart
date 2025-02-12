import Slider from "react-slick";
import Loading from "../Loading/Loading";
import useBrands from "../../Hooks/useBrands";
import { useRef } from "react";

function BrandSlider() {
  const sliderRef = useRef(null);
  const { data: brands, isLoading, isError, error } = useBrands();

  if (isLoading) return <Loading />;
  if (isError) return <h3 className="text-red-500">{error}</h3>;
  if (!brands || brands.length === 0) return <Loading />;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Slower movement (increased delay between slides)
    speed: 1000, // Slower transition between slides (increased speed)
    cssEase: "ease-in-out", // Smoother, more fluid movement
    pauseOnHover: false,
    arrows: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <div className="w-full px-4 py-6 overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {brands.map((brand) => (
          <div key={brand._id} className="p-3">
            <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full border-4 border-gray-300 shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                src={brand.image}
                alt={brand.name}
                className="h-full w-full object-contain rounded-full"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default BrandSlider;
