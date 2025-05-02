import { Link, useNavigate, useParams } from "react-router-dom";
import { Wrapper } from "../../../components/home";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect, useState } from "react";
import {
  cancelOrder,
  getOrderById,
} from "../../../redux/features/orders/order.service";
import { FaBus, FaDollarSign, FaStar, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Button, Input, Modal, Rate, Spin, Tag } from "antd";
import { notify } from "../../../helpers";
import { addReview } from "../../../redux/features/reviews/reviews.service";

export const OrderDetails = () => {
  const { id } = useParams();
  const { order, isLoading } = useSelector(selectOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalProductId, setModalProductId] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const showModal = (productId) => {
    setModalProductId(productId);
  };
  const handleOk = () => {
    setModalProductId(null);
  };
  const handleCancel = () => {
    setModalProductId(false);
  };

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const orderedDate = order ? new Date(order.createdAt) : null;

  const handleCancelOrder = async () => {
    try {
      await dispatch(cancelOrder({ orderID: id }));
      notify("Order Canceled Successfully");
      navigate("/orders");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddReview = (productId) => {
    if (!rating || !comment)
      return notify("Please provide rating and comment", "error");

    const data = { productId, rating, comment };

    try {
      dispatch(addReview(data));
      setModalProductId(null);
      notify("Review added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <>
      <Wrapper>
        <h4 className="text-lg dark:text-gray-100">Order ID : {id}</h4>
        <h4 className="text-lg dark:text-gray-100">
          Ordered Date : {orderedDate?.toLocaleDateString()}
        </h4>

        {/* information */}
        <section className="my-5 gap-y-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 rounded-lg p-7">
          {/* customer */}
          <div className="flex gap-5">
            <FaUser className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Customer</h3>
              <p>
                <span className="text-gray-500">Name</span>:{" "}
                {order?.user?.firstName + " " + order?.user?.lastName}
              </p>
              <p>
                <span className="text-gray-500">Email</span>:{" "}
                {order?.user?.email}
              </p>
              <p>
                <span className="text-gray-500">Phone</span>:{" "}
                {order?.user?.mobile}
              </p>
            </div>
          </div>

          {/* order info */}
          <div className="flex gap-5">
            <FaCartShopping className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Order Info</h3>
              <p>
                <span className="text-gray-500">Payment Method</span>:{" "}
                {order?.paymentMethod?.toUpperCase()}
              </p>
              <p>
                <span className="text-gray-500">Country</span>:{" "}
                {order?.location?.country}
              </p>
              <p>
                <span className="text-gray-500">Address</span>:{" "}
                {order?.location?.address}, {order?.location?.city}
              </p>
              <p>
                <span className="text-gray-500">Ordered Name</span>:{" "}
                {order?.firstName + " " + order?.lastName}
              </p>
              <p>
                <span className="text-gray-500">Phone</span>:{" "}
                {order?.phoneNumber}
              </p>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex gap-5">
            <FaDollarSign className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Total Price</h3>
              <p className="text-red-400 text-xl font-semibold">
                $ {order?.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* order status */}
          <div className="flex gap-5">
            <FaBus className="bg-white p-2 w-14 h-14 rounded-full" />
            <div className="space-y-2">
              <h3 className="text-2xl font-semibold">Order Status</h3>
              <Tag
                color={
                  order?.status === "pending"
                    ? "yellow"
                    : order?.status === "processing"
                    ? "orange"
                    : order?.status === "shipped"
                    ? "blue"
                    : order?.status === "delivered"
                    ? "green"
                    : "red"
                }
              >
                {order?.status}
              </Tag>

              {order?.status === "shipped" || order?.status === "delivered" ? (
                <p>
                  Order has been {order.status}. So you cannot cancel the order
                </p>
              ) : order?.status === "cancelled" ? (
                <p className="text-red-500">Order has been cancelled</p>
              ) : (
                <Button
                  block
                  danger
                  type="primary"
                  className="!mt-5"
                  onClick={handleCancelOrder}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* products */}
        <section>
          <h3 className="text-2xl dark:text-gray-100 font-semibold mb-5">
            Ordered Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {order?.product.map((product) => (
              <div
                key={product._id}
                className="border p-4 dark:bg-gray-100 rounded-md"
              >
                <div className="flex mb-3 gap-4 ">
                  <Link to={`/products/${product.productDetails?._id}`}>
                    <img
                      src={product.productDetails?.image}
                      alt={product.productDetails?.name}
                      className="w-32 h-32 object-contain"
                    />
                  </Link>
                  <div>
                    <h4 className="max-w-[200px] text-lg font-semibold">
                      {product.productDetails?.name}
                    </h4>
                    <p>
                      <span className="text-gray-500">Price</span>: ${" "}
                      {product.totalPrice}
                    </p>
                    <p>
                      <span className="text-gray-500">Quantity</span>:{" "}
                      {product.quantity}
                    </p>
                  </div>
                </div>
                {order?.status === "delivered" && (
                  <>
                    <Button
                      block
                      type="primary"
                      onClick={() => showModal(product._id)}
                      className="mt-2 rounded-none bg-orange-500 hover:!bg-orange-600"
                    >
                      Write a Review
                    </Button>
                    <Modal
                      title={
                        <div className="text-2xl font-bold underline text-center">
                          {product.productDetails?.name} <br />
                          Review
                        </div>
                      }
                      open={modalProductId === product._id}
                      onOk={handleOk}
                      onCancel={handleCancel}
                      footer={[
                        <Button
                          key="cancel"
                          onClick={handleCancel}
                          type="primary"
                          danger
                        >
                          Cancel
                        </Button>,
                        <Button
                          key="submit"
                          type="primary"
                          onClick={() => handleAddReview(product.productId)}
                          className="bg-green-600 hover:!bg-green-500"
                        >
                          Submit
                        </Button>,
                      ]}
                    >
                      <p className="mb-2 font-semibold text-lg underline">
                        Rate
                      </p>
                      <Rate
                        allowHalf
                        character={<FaStar className="text-2xl " />}
                        value={rating}
                        onChange={(value) => setRating(value)}
                      />
                      <p className="mb-2 font-semibold text-lg underline">
                        Comment
                      </p>
                      <Input.TextArea
                        rows={4}
                        placeholder="Write your comment here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="!resize-none"
                      />
                    </Modal>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </Wrapper>
    </>
  );
};
