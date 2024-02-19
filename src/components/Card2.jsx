import React from 'react';
import SideDesign from "../assets/images/SideDesign.png";

const Card2 = () => {
  return (
    <div className="bg-blue-300 h-[550px] w-full aspect-video flex flex-col md:flex-row overflow-hidden">
      <div className="flex flex-col w-full md:w-1/2 text-center md:text-left gap-5 items-center md:items-start justify-center px-6 md:px-12 lg:px-20">
        <h1 className="text-3xl md:text-5xl">Year-Round Essentials</h1>
        <p>Update classic clothing from our main store</p>
        <button className="bg-black px-6 py-2 text-white my-5">
          Learn More
        </button>
      </div>
      <div className="flex justify-center md:justify-end md:ml-auto">
        <img
          src={SideDesign}
          alt="Image 1"
          className="aspect-square h-full w-full max-w-[350px] md:max-w-none"
        />
      </div>
    </div>
  );
};

export default Card2;
