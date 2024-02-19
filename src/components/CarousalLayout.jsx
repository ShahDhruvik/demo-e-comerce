import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Laptop from "../assets/images/Carousal5.jpg";
import MensWear3 from "../assets/images/Carousal1.jpg";
import Shoes from "../assets/images/MainPageSideDesign.png";
import { useNavigate } from "react-router-dom";

const CarousalLayout = () => {
  const navigate=useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  return (
    <Slider {...settings} className="overflow-hidden">
      <div>
        <div className="bg-blue-300 md:h-[550px] w-full   aspect-video flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col w-full lg:w-[30%] pt-10  items-start justify-center">
            <h1 className="text-5xl text-center lg:text-left">Welcome To ProStore Ecommerce</h1>
            <button className="bg-black hover:bg-white hover:text-black hover:font-semibold duration-300 px-6 py-2 text-white my-5 mx-auto lg:mx-0" onClick={()=>navigate("/productPage")}>Shop Now</button>
          </div>
          <div className="flex items-center justify-center">
            <img src={Shoes} alt="Image 1" className="aspect-square h-auto md:h-96 w-auto" />
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          <img src={MensWear3} alt="Image 2" className="aspect-video h-[550px] w-full object-cover" />
          <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <h1 className="text-white text-5xl font-bold mb-4">explore our prostore and exiting offers</h1>
            <button className="bg-black text-white hover:bg-white  hover:text-black duration-300 rounded-lg px-6 py-2" onClick={()=>navigate("/productPage")}>Shop Now</button>
          </div>
        </div>
      </div>
      <div>
        <img src={Laptop} alt="Image 3" className="aspect-video h-[550px] w-full object-cover" />
      </div>
    </Slider>
  );
};

export default CarousalLayout;
