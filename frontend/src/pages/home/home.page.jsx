import { CarouselComponent } from "../../components/home";
import { Categories } from "../../components/home/homeComponent/Category.component";
import { Products } from "../../components/home/homeComponent/Products.component";

export const Home = () => {
  return (
    <>
      <CarouselComponent />

      <Products />

      <Categories />
    </>
  );
};
