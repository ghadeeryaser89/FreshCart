import MainSlider from "../MainSlider/MainSlider";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import BrandSlider from "../BrandSlider/BrandSlider";

function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <BrandSlider />
      <RecentProducts />
    </>
  );
}

export default Home;
