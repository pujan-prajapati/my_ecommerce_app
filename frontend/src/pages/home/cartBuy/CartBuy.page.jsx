import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/features/cart/cart.slice";
import { useEffect, useState } from "react";
import { getCart } from "../../../redux/features/cart/cart.service";
import { Wrapper } from "../../../components/home";
import { Button, Form, Input, Select } from "antd";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { notify } from "../../../helpers";
import { orderItem } from "../../../redux/features/orders/order.service";
import { useNavigate } from "react-router-dom";

export const CartBuy = () => {
  const { items } = useSelector(selectCart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectEsewa, setSelectEsewa] = useState(false);
  const { isLoading, errorMsg } = useSelector(selectOrder);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const calculateTotal = items.reduce(
      (sum, item) => sum + item?.product?.price * item?.quantity,
      0
    );
    setTotalPrice(calculateTotal);
  }, [items]);

  const handleEsewa = (value) => {
    setSelectEsewa(value === "esewa");
  };

  const handleFinish = (values) => {
    const orderItems = items.map((item) => {
      if (!item || !item.product) {
        throw new Error("Item or product information is missing.");
      }

      return {
        productId: item?.product?._id,
        quantity: item?.quantity,
      };
    });

    try {
      dispatch(
        orderItem({
          ...values,
          product: orderItems,
          totalPrice: totalPrice,
        })
      );
      notify("Order Placed Successfully");
      navigate("/orders");
    } catch (error) {
      console.log(errorMsg + error);
    }
  };

  return (
    <>
      <Wrapper>
        <section className="lg:px-52 grid gap-16 grid-cols-1 md:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold mb-6 underline">Cart Summary</h1>
            {items.map((item) => (
              <div
                key={item?._id}
                className="border-b-2 py-4 flex  justify-between"
              >
                <div className="flex gap-4 ">
                  <img
                    src={item?.product?.image}
                    alt={item?.name}
                    className="w-20 h-24 object-contain"
                  />
                  <div>
                    <p className="max-w-xs text-xl">{item?.product?.name}</p>
                    <p className="text-lg text-red-500">
                      $ {item?.product?.price}
                    </p>
                    <p className="text-lg">Quantity: {item?.quantity}</p>
                  </div>
                </div>

                <p className="text-2xl font-semibold text-red-500">
                  $ {item?.product?.price * item?.quantity}
                </p>
              </div>
            ))}

            <p className="float-end mt-4 text-xl font-semibold text-red-700">
              Total Price : $ {totalPrice.toFixed(2)}
            </p>
          </div>

          <div>
            {/* Delivery */}
            <h1 className="mb-5 text-3xl underline font-semibold">Delivery</h1>
            <Form layout="vertical" onFinish={handleFinish}>
              {/* select country */}
              <Form.Item
                name="country"
                rules={[
                  {
                    required: true,
                    message: "Please input your delivery!",
                  },
                ]}
              >
                <Select size="large" placeholder="Select Country">
                  <Select.Option value="Nepal">Nepal</Select.Option>
                </Select>
              </Form.Item>

              {/* name */}
              <div className="flex gap-2">
                <Form.Item
                  name="firstName"
                  className="w-full"
                  rules={[
                    {
                      required: true,
                      message: "Please input your fist name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter first name" />
                </Form.Item>

                <Form.Item
                  className="w-full"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter last name" />
                </Form.Item>
              </div>

              {/* address */}
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter address" />
              </Form.Item>

              {/* city */}
              <Form.Item
                name="city"
                rules={[
                  {
                    required: true,
                    message: "Please input your city!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter city" />
              </Form.Item>

              {/* phoneNumber */}
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input size="large" placeholder="Enter phone number" />
              </Form.Item>

              {/* payment method */}
              <h1 className="text-2xl font-bold mb-2">Payment method</h1>

              <Form.Item
                name="paymentMethod"
                rules={[
                  {
                    required: true,
                    message: "Please select your payment method!",
                  },
                ]}
              >
                <Select
                  size="large"
                  placeholder="Select payment method"
                  onChange={handleEsewa}
                >
                  <Select.Option value="cod">Cash on delivery</Select.Option>
                  <Select.Option value="esewa">ESEWA</Select.Option>
                </Select>
              </Form.Item>
              {selectEsewa && (
                <div className="-mt-6  bg-gray-100 w-[500px] p-2 font-bold rounded-lg">
                  <p>Esewa id : 9876543210</p>
                  <p>Esewa id Name : My Store</p>
                </div>
              )}

              {/* button */}
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  block
                  className="bg-orange-500 py-6 font-semibold text-white  hover:!bg-orange-600 shadow-none"
                  loading={isLoading}
                >
                  Complete Order
                </Button>
              </Form.Item>
            </Form>
          </div>
        </section>
      </Wrapper>
    </>
  );
};
