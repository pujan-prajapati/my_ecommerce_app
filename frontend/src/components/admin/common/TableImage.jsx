/* eslint-disable react/prop-types */

export const TableImage = (props) => {
  return (
    <img
      src={props.src}
      alt={props.alt}
      style={{ width: 80, height: 50, objectFit: "contain" }}
    />
  );
};
