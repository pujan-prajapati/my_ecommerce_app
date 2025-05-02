import { useDispatch, useSelector } from "react-redux";
import { HomeHeader, Wrapper } from "../../../components/home";
import { selectWishlist } from "../../../redux/features/wishlist/wishlist.slice";
import { useEffect, useState } from "react";
import {
  getAllWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlist.service";
import { Button, Table } from "antd";
import { FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { getLocalStore, notify, setLocalStore } from "../../../helpers";
import { addToCart } from "../../../redux/features/cart/cart.service";

const columns = (dispatch, wishlist, setWishlist) => [
  {
    title: "Id",
    dataIndex: "_id",
    key: "_id",
    width: "50px",
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <img src={text} alt={record.name} className="w-14 h-14 object-contain" />
    ),
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <p className=" text-lg font-semibold">{text}</p>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <p className="text-red-400 text-lg font-semibold">$ {text}</p>
    ),
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    align: "right",
    render: (text, record) => (
      <div className="flex gap-2 justify-end">
        <Button
          type="primary"
          className="bg-orange-500 hover:!bg-orange-600"
          onClick={() =>
            dispatch(addToCart({ productId: record._id, quantity: 1 })).then(
              () => {
                notify("Item added to cart");
              }
            )
          }
        >
          Add To Cart
        </Button>
        <Button
          type="primary"
          danger
          icon={<FaTrash />}
          onClick={() =>
            dispatch(removeFromWishlist(record._id)).then(() => {
              dispatch(getAllWishlist());
              const updatedWishlist = wishlist.filter(
                (item) => item !== record._id
              );
              setWishlist(updatedWishlist);
              const updatedUser = {
                ...getLocalStore("user"),
                wishlist: updatedWishlist,
              };
              setLocalStore("user", updatedUser);
            })
          }
        />
        <Link to={`/products/${record._id}`}>
          <Button
            type="primary"
            className="bg-green-500 hover:!bg-green-600"
            icon={<FaEye />}
          />
        </Link>
      </div>
    ),
  },
];

export const WishList = () => {
  const { items } = useSelector(selectWishlist);
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [wishlist, setWishlist] = useState(
    getLocalStore("user")?.wishlist || []
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys);
    },
  };

  useEffect(() => {
    dispatch(getAllWishlist());
  }, [dispatch]);

  const handleDeleteSelected = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleting...",
          text: "Please wait while we delete the admin.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        for (const id of selectedRowKeys) {
          await dispatch(removeFromWishlist(id));
          const updatedWishlist = wishlist.filter((item) => item !== id);
          setWishlist(updatedWishlist); // Update state
          // Update localStorage with the new wishlist
          const updatedUser = {
            ...getLocalStore("user"),
            wishlist: updatedWishlist,
          };
          setLocalStore("user", updatedUser);
          dispatch(getAllWishlist());
        }
        setSelectedRowKeys([]);
        Swal.fire({
          title: "Deleted!",
          text: "Deleted Successfully.",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <Wrapper>
        <HomeHeader className={"text-center"} title={"Wishlist"} />

        <div className="mb-4 flex justify-end">
          <Button
            danger
            type="primary"
            hidden={!selectedRowKeys.length}
            onClick={handleDeleteSelected}
          >
            <FaTrash /> Delete Selected
          </Button>
        </div>
        {items.length > 0 ? (
          <Table
            columns={columns(dispatch, wishlist, setWishlist)}
            dataSource={items}
            rowKey={"_id"}
            rowSelection={rowSelection}
            bordered
          />
        ) : (
          <p className="text-center text-lg font-semibold">
            Your wishlist is empty.
          </p>
        )}
      </Wrapper>
    </>
  );
};
