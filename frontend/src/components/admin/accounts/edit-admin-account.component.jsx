import { useDispatch, useSelector } from "react-redux";
import { AdminHeader } from "../AdminHeader";
import { AccountsForm } from "./accounts-form.component";
import {
  getAllAdmins,
  updateUserStatus,
} from "../../../redux/features/accounts/accounts.service";
import { useForm } from "antd/es/form/Form";
import { notify } from "../../../helpers";
import { useNavigate, useParams } from "react-router-dom";
import { selectAccount } from "../../../redux/features/accounts/accounts.slice";
import { Spin } from "antd";

export const AdminAccountsEdit = () => {
  const { id } = useParams();
  const [form] = useForm();
  const { isLoading } = useSelector(selectAccount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await dispatch(updateUserStatus({ userID: id, formData: values }));
    notify("User Status Updated Successfully");
    await dispatch(getAllAdmins());
    form.resetFields();
    navigate("/admin/accounts");
  };

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spin />
      </div>
    );

  return (
    <>
      <AdminHeader
        base_href="/admin/accounts/users"
        base_title="Accounts"
        page_title="Edit Account"
      />

      <AccountsForm onFinish={onFinish} form={form} />
    </>
  );
};
