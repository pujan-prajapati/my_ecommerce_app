import { Link } from "react-router-dom";
import { Wrapper } from "../wrapper";

export const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100 dark:bg-transparent dark:border-t-2 border-gray-400">
        <Wrapper className={"flex justify-between items-center"}>
          <div>
            <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024 . All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-5 items-center">
            <Link
              to={""}
              className="hover:text-orange-500 hover:underline text-gray-600"
            >
              Privacy Policy
            </Link>
            <Link
              to={"/contact"}
              className="hover:text-orange-500 hover:underline text-gray-600"
            >
              Contact
            </Link>
          </div>
        </Wrapper>
      </footer>
    </>
  );
};
