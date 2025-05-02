import { Button, Form, Select, Spin, Tag } from "antd";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} from "../../../redux/features/orders/order.service";
import { notify } from "../../../helpers";
import { selectOrder } from "../../../redux/features/orders/order.slice";
import { useEffect } from "react";
import { FaBus, FaDollarSign, FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

export const OrderStatusEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, order } = useSelector(selectOrder);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  const onFinish = async (values) => {
    try {
      await dispatch(updateOrderStatus({ orderID: id, formData: values }));
      notify("Order Status Updated Successfully");
      await dispatch(getAllOrders());
      navigate("/admin/orders");
    } catch (error) {
      notify(error, "error");
    }
  };

  if (isLoading) return <Spin fullscreen />;

  return (
    <>
      <AdminHeader
        base_href={"/admin/orders"}
        base_title={"Orders"}
        page_title={"Order Status Edit"}
      />

      <Form
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        labelAlign="left"
        initialValues={{ status: order?.status }}
      >
        <Form.Item label="Status" name={"status"}>
          <Select
            placeholder="Select Status"
            options={[
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
            ]}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {/* order details */}
      <section>
        {/* information */}
        <div className="my-5 gap-y-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-gray-100 rounded-lg p-7">
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
            </div>
          </div>
        </div>

        {/* products */}
        <section>
          <h3 className="text-2xl dark:text-gray-100 font-semibold mb-5">
            Ordered Products
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {order?.product.map((product) => (
              <div key={product._id} className="p-4 bg-white rounded-md">
                <div className="flex mb-3 gap-4 ">
                  <img
                    src={product.productDetails?.image}
                    alt={product.productDetails?.name}
                    className="w-32 h-32 object-contain"
                  />
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
              </div>
            ))}
          </div>
        </section>
      </section>
    </>
  );
};
