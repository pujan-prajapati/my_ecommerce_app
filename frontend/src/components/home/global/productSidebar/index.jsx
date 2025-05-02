/* eslint-disable react/prop-types */
import { Button, InputNumber, notification, Select } from "antd";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../../../redux/features/products/product.service";
import { useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";

export const ProductSidebar = ({ searchValue, products }) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirectin] = useState("asc");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  const filterProduct = (sortBy, sortDirection, minPrice, maxPrice) => {
    dispatch(
      getAllProducts({
        page: 1,
        limit: 10,
        search: searchValue,
        sortBy,
        sortDirection,
        minPrice,
        maxPrice,
      })
    );
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    filterProduct(value, sortDirection, minPrice, maxPrice);
  };

  const toggleSortDirection = () => {
    const newDirection = sortDirection === "asc" ? "desc" : "asc"; // Toggle between "asc" and "desc"
    setSortDirectin(newDirection);
    filterProduct(sortBy, newDirection, minPrice, maxPrice);
  };

  const handlePriceFilter = () => {
    // Find the lowest price in the products list
    const lowestPrice = Math.min(...products.map((product) => product.price));

    // Check if maxPrice is less than the lowest product price
    if (maxPrice < lowestPrice) {
      notification.error({
        message: "Max Price Too Low",
        description: `The maximum price cannot be less than the lowest product price of $${lowestPrice}.`,
      });
      return;
    }

    if (maxPrice < minPrice) {
      notification.error({
        message: "Invalid Price Range",
        description: "The maximum price cannot be less than the minimum price.",
      });
      return;
    }

    filterProduct(sortBy, sortDirection, minPrice, maxPrice);
  };

  return (
    <div>
      {sortBy && (
        <Button type="primary" className="mb-2" onClick={toggleSortDirection}>
          <HiArrowsUpDown />{" "}
          {sortDirection === "asc"
            ? "Filter from High to Low"
            : "Filter from Low to High"}
        </Button>
      )}
      <Select
        value={sortBy || undefined}
        placeholder="Sort by"
        className="w-full"
        onChange={handleSortChange}
        options={[
          { value: "name", label: "Name" },
          { value: "price", label: "Price" },
        ]}
      />

      <div className=" mt-4">
        <h2>Price Range</h2>
        <div className="flex gap-2">
          <InputNumber
            value={minPrice}
            min={0}
            className="w-full"
            placeholder="Min"
            type="number"
            onChange={(value) => setMinPrice(value)}
          />
          <InputNumber
            value={maxPrice}
            min={0}
            className="w-full"
            placeholder="Max"
            type="number"
            onChange={(value) => setMaxPrice(value)}
          />
          <Button className="flex-1" type="primary" onClick={handlePriceFilter}>
            Go
          </Button>
        </div>
      </div>
    </div>
  );
};
