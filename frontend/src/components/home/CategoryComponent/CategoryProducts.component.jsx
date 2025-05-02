import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useEffect, useState, useCallback } from "react";
import { getProductsByCategory } from "../../../redux/features/products/product.service";
import { getLocalStore, notify, setLocalStore } from "../../../helpers";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlist.service";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ProductSidebar } from "../global/productSidebar";
import { Wrapper } from "../global";
import { Spin } from "antd";

export const CategoryProducts = () => {
  const { id } = useParams();
  const { products, isLoading } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = getLocalStore("user");
  const [wishlist, setWishlist] = useState(user?.wishlist || []);

  useEffect(() => {
    dispatch(getProductsByCategory(id));
  }, [dispatch, id]);

  const handleLike = useCallback(
    (id) => {
      const token = getLocalStore("accessToken");
      if (token) {
        let updatedWishlist;
        if (wishlist.includes(id)) {
          updatedWishlist = wishlist.filter((item) => item !== id);
          dispatch(removeFromWishlist(id));
          notify("Item removed from wishlist");
        } else {
          updatedWishlist = [...wishlist, id];
          dispatch(addToWishlist(id));
          notify("Item added to wishlist");
        }

        setWishlist(updatedWishlist);
        const updatedUser = { ...user, wishlist: updatedWishlist };
        setLocalStore("user", updatedUser);
      } else {
        navigate("/login");
      }
    },
    [dispatch, wishlist, user, navigate]
  );

  return (
    <>
      <Wrapper>
        <section className="flex gap-5 mt-5">
          <div className="w-[20.8333%] ">
            <ProductSidebar
              searchValue={products?.[0]?.category?.name}
              products={products}
            />
          </div>
          <div className="flex-1">
            <section>
              <div className="mb-5">
                <h1 className="text-3xl font-bold dark:text-white">
                  Product: {products?.[0]?.category?.name}
                </h1>
                <p className="dark:text-white">
                  Total: {products?.length} Products
                </p>
              </div>
              {isLoading ? (
                <Spin className="flex justify-center items-center" />
              ) : products.length === 0 ? (
                <p>No products found</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-fit gap-4">
                  {products.map((product) => (
                    <div
                      className="mb-3 h-[400px] bg-gray-100 hover:shadow-md transition-all duration-300 relative"
                      key={product._id}
                    >
                      <Link to={`/products/${product._id}`}>
                        <div className="h-[230px]">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full bg-white w-full object-contain"
                          />
                        </div>
                      </Link>

                      <div className="font-semibold p-2">
                        <h1 className="text-lg">{product.name}</h1>
                        <p className="text-red-500 text-xl">
                          $ {product.price}
                        </p>
                        <p className="font-normal">
                          {product.description.length > 50
                            ? product.description.slice(0, 50) + "..."
                            : product.description}
                        </p>
                      </div>
                      <div
                        className="absolute bottom-4 right-4 cursor-pointer"
                        onClick={() => handleLike(product._id)}
                        aria-label={`Add or remove ${product.name} from wishlist`}
                      >
                        {wishlist.includes(product._id) ? (
                          <FaHeart
                            aria-label="Added to wishlist"
                            className="w-6 h-6 text-red-500"
                          />
                        ) : (
                          <FaRegHeart
                            aria-label="Add to wishlist"
                            className="w-6 h-6"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </section>
      </Wrapper>
    </>
  );
};
