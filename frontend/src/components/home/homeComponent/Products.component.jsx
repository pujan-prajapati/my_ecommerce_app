import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { HomeHeader, Wrapper } from "../global";
import { getLatestProducts } from "../../../redux/features/products/product.service";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlist.service";
import { getLocalStore, notify, setLocalStore } from "../../../helpers";

export const Products = () => {
  const { products } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = getLocalStore("user");
  const [wishlist, setWishlist] = useState(user?.wishlist || []);

  useEffect(() => {
    dispatch(getLatestProducts());
  }, [dispatch]);

  const handleLike = useCallback(
    (id) => {
      if (user) {
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
        <HomeHeader title={"Latest Products"} />

        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="h-[300px] relative bg-gray-100 rounded-md  hover:shadow-lg dark:shadow-gray-200 transition-all duration-300"
            >
              <Link to={`/products/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full rounded-md bg-gray-50 object-contain"
                />
              </Link>
              <div className="p-3 space-y-2 ">
                <p className="text-lg ">
                  {product.name.length > 50
                    ? `${product.name.slice(0, 50)}...`
                    : product.name}
                </p>
                <p className="text-xl  text-red-500 dark:text-red-500 ">
                  $ {product.price}
                </p>
                <div
                  className="absolute bottom-4 right-4 cursor-pointer"
                  onClick={() => handleLike(product._id)}
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
            </div>
          ))}
        </section>
      </Wrapper>
    </>
  );
};
