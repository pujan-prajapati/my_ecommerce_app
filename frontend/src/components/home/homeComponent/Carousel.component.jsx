import { Button, Carousel } from "antd";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export const CarouselComponent = () => {
  const ref = useRef();

  return (
    <section className="relative">
      <Carousel draggable autoplay fade ref={ref}>
        <div className="relative">
          <img
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
            alt=""
            className="w-full h-96 object-fill brightness-50 opacity-50"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl font-bold !text-white">
              This is Home Page
            </h1>
          </div>
        </div>
        <div>
          <img
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg"
            alt=""
            className="w-full h-96 object-fill brightness-50 opacity-50"
          />
        </div>
        <div>
          <img
            src="https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg"
            alt=""
            className="w-full h-96 object-fill brightness-50 opacity-50"
          />
        </div>
      </Carousel>
      <Button
        type="primary"
        onClick={() => ref.current.prev()}
        className="w-12 h-12 rounded-full absolute top-1/2 left-5 bg-green-500 hover:!bg-green-600"
      >
        <FaChevronLeft />
      </Button>
      <Button
        onClick={() => ref.current.next()}
        type="primary"
        className="w-12 h-12 rounded-full absolute top-1/2 right-5 bg-green-500 hover:!bg-green-600"
      >
        <FaChevronRight />
      </Button>
    </section>
  );
};
