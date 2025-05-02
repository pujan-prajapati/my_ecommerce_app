/* eslint-disable react/prop-types */

export const HomeHeader = ({ title, className }) => {
  return (
    <h1
      className={`text-3xl mb-5 text-gray-700 uppercase font-semibold underline ${className}`}
    >
      {title}
    </h1>
  );
};
