import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CategoryForm } from "./category-form.component";
import { createCategory } from "../../../redux/features/category/category.service";
import { notify } from "../../../helpers";
import { AdminHeader } from "../AdminHeader";

export const CategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      await dispatch(createCategory(formData));
      notify("Category Created Successfully");
      navigate("/admin/category");
    } catch (error) {
      notify("Error Occurred" + error, "error");
    }
  };

  return (
    <>
      <AdminHeader
        page_title={"Create Category"}
        base_title={"Category"}
        base_href={"/admin/category"}
      />
      <CategoryForm onFinish={handleSubmit} />
    </>
  );
};
