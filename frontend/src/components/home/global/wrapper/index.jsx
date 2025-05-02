/* eslint-disable react/prop-types */
export const Wrapper = ({ children, className }) => {
  return (
    <section className={`${className} px-3 md:px-0 md:container py-4`}>
      {children}
    </section>
  );
};
