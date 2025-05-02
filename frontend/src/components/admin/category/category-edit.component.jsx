import { useNavigate, useParams } from "react-router-dom";
import { AdminHeader } from "../AdminHeader";
import { CategoryForm } from "./category-form.component";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../../../redux/features/category/category.slice";
import { useEffect } from "react";
import {
  getCategoryById,
  updateCategory,
} from "../../../redux/features/category/category.service";
import { notify } from "../../../helpers";

export const CategoryEdit = () => {
  const { id } = useParams();
  const { category } = useSelector(selectCategory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  const onFinish = async (values) => {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await dispatch(updateCategory({ categoryID: id, formData }));
    notify("Category Updated Successfully");
    navigate("/admin/category");
  };

  return (
    <>
      <AdminHeader
        base_href="/admin/category"
        base_title="Category"
        page_title="Edit Category"
      />

      <CategoryForm initialValues={category} onFinish={onFinish} />
    </>
  );
};
