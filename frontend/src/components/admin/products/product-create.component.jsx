import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { notify } from "../../../helpers";
import { AdminHeader } from "../AdminHeader";
import { createProduct } from "../../../redux/features/products/product.service";
import { ProductForm } from "./product-form.component";

export const ProductCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await dispatch(createProduct(formData));
      notify("Product created Successfully");
      navigate("/admin/products");
    } catch (error) {
      notify("Error Occurred" + error, "error");
    }
  };

  return (
    <>
      <AdminHeader
        page_title={"Create Product"}
        base_title={"Product"}
        base_href={"/admin/product"}
      />
      <ProductForm onFinish={handleSubmit} />
    </>
  );
};
