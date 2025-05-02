/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/features/cart/cart.slice";
import {
  getCart,
  removeFromCart,
  updateCart,
} from "../../../redux/features/cart/cart.service";
import { Button, InputNumber, Spin } from "antd";
import { FaTrash } from "react-icons/fa";
import { notify } from "../../../helpers";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const CartList = ({ setOpen }) => {
  const token = localStorage.getItem("accessToken");

  const { items, isLoading, errorMsg } = useSelector(selectCart);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState({});
  const navigate = useNavigate();

  const deleteCartItem = async (productId) => {
    try {
      await dispatch(removeFromCart({ productId }));
      notify("Item deleted from cart");
      dispatch(getCart());
    } catch (isError) {
      notify(errorMsg || isError, "error");
    }
  };

  const handleQuantityChange = (productId, value) => {
    if (value < 1) return;
    setQuantity((prev) => ({ ...prev, [productId]: value }));
  };

  const handleQuantityBlurOrEnter = async (productId) => {
    const qty = quantity[productId] || 1; // Use local state value
    await dispatch(updateCart({ productId, quantity: qty }));
    dispatch(getCart());
  };

  const handleKeyDown = (event, productId) => {
    if (event.key === "Enter") {
      handleQuantityBlurOrEnter(productId);
    }
  };

  const handleBuyNow = () => {
    setOpen(false);
    navigate("/cart/buy");
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <>
      <div className="flex flex-col h-full">
        {!token && (
          <div className="flex flex-col justify-center items-center gap-6">
            <p className="text-center text-3xl font-semibold">
              Please Login to view cart
            </p>
            <Link to={"/login"}>
              <Button type="primary" className="w-40 py-5">
                Login
              </Button>
            </Link>
          </div>
        )}
        {token && items.length === 0 ? (
          <p className="text-center text-3xl font-semibold leading-loose">
            Cart is empty.
          </p>
        ) : (
          token &&
          items.map(
            (item) =>
              item?.product && (
                <div key={item?._id} className="flex justify-between mb-7 ">
                  <div className="flex gap-4 ">
                    <img
                      src={item?.product?.image}
                      alt={item?.product?.name}
                      className="w-20 h-28 object-contain"
                    />

                    <div className="space-y-2 max-w-72">
                      <p className="text-lg font-bold">{item?.product?.name}</p>
                      <p className="text-lg text-red-500 font-semibold">
                        $ {item?.product?.price}
                      </p>
                      <p>Quantity : {item?.product?.quantity}</p>
                      <div className="flex gap-5">
                        <InputNumber
                          min={1}
                          max={item?.product?.quantity}
                          value={quantity[item?.product?._id] || item?.quantity}
                          type="number"
                          onChange={(value) =>
                            handleQuantityChange(item?.product?._id, value)
                          }
                          onBlur={() =>
                            handleQuantityBlurOrEnter(item?.product?._id)
                          }
                          onKeyDown={(event) =>
                            handleKeyDown(event, item?.product?._id)
                          }
                        />
                        <Button
                          type="primary"
                          danger
                          onClick={() => deleteCartItem(item?.product?._id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-red-500 font-semibold">
                    $ {item?.product?.price * item?.quantity}
                  </p>
                </div>
              )
          )
        )}

        {token && items.length !== 0 && (
          <div className="mt-auto ">
            <Button
              type="primary"
              block
              className=" bg-orange-500 hover:!bg-orange-600 !py-6"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
