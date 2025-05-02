import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wrapper } from "../global/wrapper";
import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { useCallback, useEffect, useState } from "react";
import { getAllProducts } from "../../../redux/features/products/product.service";
import { ProductSidebar } from "../global/productSidebar";
import { Pagination, Spin } from "antd";
import { getLocalStore, notify, setLocalStore } from "../../../helpers";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/features/wishlist/wishlist.service";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const SearchProducts = () => {
  const user = getLocalStore("user");

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const searchValue = searchParams.get("search") || "";
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products, isLoading, totalPages, currentPage, totalProducts } =
    useSelector(selectProduct);
  const [wishlist, setWishlist] = useState(user?.wishlist || []);

  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 10, search: searchValue }));
  }, [dispatch, searchValue]);

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
      <Wrapper className="flex py-0 gap-4">
        <div className="w-[20.8333%]">
          <ProductSidebar searchValue={searchValue} products={products} />
        </div>
        <div className="flex-1">
          <section>
            <h1>Search Results for : {searchValue} </h1>
            <p>Total Products : {products.length}</p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-fit gap-4">
              {isLoading ? (
                <Spin />
              ) : (
                products.map((product) => (
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
                      <h1>{product.name}</h1>
                      <p className="text-red-500">$ {product.price}</p>
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
                ))
              )}
            </div>
          </section>

          {totalPages > 1 && (
            <div className="text-center mt-4">
              <Pagination
                current={currentPage}
                total={totalProducts}
                pageSize={10}
                onChange={(page) =>
                  dispatch(getAllProducts({ page, limit: 10 }))
                }
                showSizeChanger={false}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
              />
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};
