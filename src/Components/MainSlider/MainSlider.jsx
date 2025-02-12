import Slider from "react-slick";
import img1 from "../../assets/imgs/main-slider-1.jpeg";
import img2 from "../../assets/imgs/main-slider-2.jpeg";
import img3 from "../../assets/imgs/main-slider-3.jpeg";
import img4 from "../../assets/imgs/slide-1.jpeg";
import img5 from "../../assets/imgs/slide-2.jpeg";

function MainSlider() {
  const settings = {
    dots: false,
    infinite: true, // Allows looping but not continuous motion
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, // Changes slides every 3 seconds
    speed: 1000, // Smooth fade transition
    fade: true, // Adds a fading effect instead of abrupt movement
    pauseOnHover: true, // Stops autoplay when hovered
    arrows: false, // Removes navigation arrows
  };

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-6">
      {/* Main Slider Section */}
      <div className="md:col-span-8 col-span-12 overflow-hidden rounded-lg shadow-lg">
        <Slider {...settings}>
          <img src={img1} alt="Slide 1" className="h-[400px] w-full object-cover rounded-lg" />
          <img src={img4} alt="Slide 2" className="h-[400px] w-full object-cover rounded-lg" />
          <img src={img5} alt="Slide 3" className="h-[400px] w-full object-cover rounded-lg" />
        </Slider>
      </div>

      {/* Side Images */}
      <div className="md:col-span-4 col-span-12 flex flex-col gap-4">
        <img src={img2} alt="Side 1" className="h-[200px] w-full object-cover rounded-lg shadow-md" />
        <img src={img3} alt="Side 2" className="h-[200px] w-full object-cover rounded-lg shadow-md" />
      </div>
    </div>
  );
}

export default MainSlider;
