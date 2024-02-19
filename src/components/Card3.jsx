import React from 'react';
import CardImage from "../assets/images/Card3.png";

const Card3 = () => {
  return (
    <div className="bg-[#e6cefe] h-[500px] overflow-hidden md:h-[550px] w-full aspect-video flex flex-col md:flex-row">
      <div className="flex flex-col w-full md:w-1/2 text-center md:text-left gap-5 items-center md:items-start justify-center px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-5xl mt-10 md:mt-0">Get The Best Deals</h1>
        <p>New users receive a 10% discount code</p>
        <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Your Name"
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <input
        type="email"
        placeholder="Your Email"
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Join
      </button>
    </div>
      </div>
      <div className="flex justify-center md:justify-end md:ml-auto">
        <img
          src={CardImage}
          alt="Image 1"
          className="aspect-square h-full w-full max-w-[350px] md:max-w-none"
        />
      </div>
    </div>
  );
};

export default Card3;
