import React from 'react';
import Us from "../assets/images/Us1.jpg";
import Us2 from "../assets/images/Us2.jpg";
import Us3 from "../assets/images/Us3.jpg";
import Us4 from "../assets/images/Us4.jpg";
import {ReactComponent as InstagramIcon} from "../assets/svg/insta.svg";

const FindUs = () => {
  const images = [Us, Us2, Us3, Us3,Us4]; 

  return (
    <div className="flex flex-wrap justify-center items-center mt-10 ">
      <h1 className="text-center text-3xl font-bold">Find Us On Instagram<br/>
      <a href="https://www.instagram.com/" className="text-center text-xl text-blue-500 hover:cursor-pointer ">@prostore</a>
      </h1>
      
      

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img src={image} alt="image" className="aspect-square object-cover w-full" />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute inset-0 bg-white opacity-70"></div>
              <InstagramIcon className="w-8 h-8 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindUs;
