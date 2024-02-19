import React from "react";
import { ReactComponent as InstagramIcon } from "../assets/svg/insta.svg";
import { ReactComponent as Paypal } from "../assets/svg/paypal.svg";
import { ReactComponent as Apay } from "../assets/svg/apple-pay.svg";
import { ReactComponent as Gpay } from "../assets/svg/google-pay.svg";
import { ReactComponent as Strapie } from "../assets/svg/stripe.svg";
import { ReactComponent as Fb } from "../assets/svg/fb .svg";
import { ReactComponent as Twitter } from "../assets/svg/twitter.svg";
import GooglePayButton from '@google-pay/button-react';

const Footer = () => {
  return (
    <footer className="bg-[#001e42] py-8 ">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col mb-8 lg:mb-0">
          <h1 className="font-bold text-lg text-white text-center">PROSTORE</h1>
          <p className="text-white text-sm max-w-sm">
            Create your Online Store with ProStore, a Webflow Ecommerce Template
            that packs powerful selling features.
          </p>
          <div className="  mt-4  grid grid-flow-col ">
            <a href="https://www.paypal.com/in/home"><Paypal className=" fill-white "  /></a>
            <a href="https://pay.google.com/about/"><Gpay className=" fill-white"/>
        
            
            
            
            
            </a>
            <a href="https://www.apple.com/apple-pay/"><Apay  className=" fill-white"/></a>
            <a href="https://stripe.com/en-in"><Strapie  className=" fill-white"/></a>
          </div>
        </div>

        <div className="flex flex-col mb-8 text-center lg:mb-0 md:text-left  ">
          <h2 className="font-bold text-white text-lg">Menu</h2>
          <ul>
            <li className="text-white"><a href="/">Home</a></li>
            <li className="text-white"><a href="/about">About Us </a></li>
            <li className="text-white">Blog</li>
          </ul>
        </div>

        <div className="flex flex-col mb-8 lg:mb-0 text-center md:text-left">
          <h2 className="font-bold text-white text-lg">Shop</h2>
          <ul>
            <li className="text-white">Gift</li>
            <li className="text-white">Beauty</li>
            <li className="text-white">Jewelry</li>
            <li className="text-white">Women's Clothing</li>
            <li className="text-white">Gadgets</li>
          </ul>
        </div>

        <div className="flex flex-col mb-8 lg:mb-0 text-center md:text-left">
          <h2 className="font-bold text-white text-lg">Contact</h2>
          <ul>
            <li className="text-white">Blog</li>
            <li className="text-white">FAQ</li>
            <li className="text-white">Contact Us</li>
            <li className="text-white">Terms and Conditions</li>
            <li className="text-white">Website</li>
          </ul>
        </div>

        <div className="flex items-center">
          <InstagramIcon className="w-6 h-6 text-white mr-4" />
          <Fb className="w-6 h-6 fill-white mr-4" />
          <Twitter className="w-6 h-6 fill-white mr-4" />
        </div>
      </div>

      <div className="container mx-auto mt-8 text-center text-sm text-gray-500 text-white ">
        &copy; {new Date().getFullYear()} All rights reserved. 
        <h1>Designed by
        Devang Prajapati.</h1>
      </div>
    </footer>
  );
};

export default Footer;
