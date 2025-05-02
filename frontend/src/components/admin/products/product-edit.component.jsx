import { useNavigate, useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { notify } from "../../../helpers";
import {
  getProductById,
  updateProduct,
} from "../../../redux/features/products/product.service";
import { selectProduct } from "../../../redux/features/products/product.slice";
import { ProductForm } from "./product-form.component";

export const ProductEdit = () => {
  const { id } = useParams();
  const { product } = useSelector(selectProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const onFinish = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await dispatch(updateProduct({ productID: id, formData }));
    notify("Product Updated Successfully");
    navigate("/admin/products");
  };

  return (
    <>
      <AdminHeader
        base_href="/admin/products"
        base_title="Product"
        page_title="Edit Product"
      />

      <ProductForm initialValues={product} onFinish={onFinish} />
    </>
  );
};
