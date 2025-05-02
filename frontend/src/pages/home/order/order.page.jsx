import { Wrapper } from "../../../components/home/global/wrapper";
import { HomeHeader } from "../../../components/home/global/homeHeader";
import { MyOrder } from "../../../components/home/OrderComponent/MyOrder.component";

export const OrderPage = () => {
  return (
    <>
      <Wrapper>
        <HomeHeader className={"text-center"} title={"My Order"} />

        <MyOrder />
      </Wrapper>
    </>
  );
};
