import React, { useRef } from 'react'
import AboutDesign from "../assets/images/AboutCard.jpg";
import Footer from './Footer';
import FindUs from '../components/Find Us';
import emailjs from '@emailjs/browser';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  mobile: Yup.string().min(10, 'Mobile number must be at least 10 digits').required('Mobile is required'),
  message: Yup.string().required('Message is required'),
});





const ContactUs = () => {
  const form = useRef();
   
        const handleScroll = () => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
          });
        }

        const sendEmail = (e) => {
          e.preventDefault();
      console.log("function called");
          emailjs.sendForm('service_p4pmwxd', 'template_bwtm5e6', form.current, 'Lf6p65_NVjhHr8wo3')
            .then((result) => {
                console.log(result.text);
                document.getElementById('myform').reset();
                toast.success("response submitted successfully!")
                
            }, (error) => {
                console.log(error.text);
            });
        };
  return (
    <div>
      <ToastContainer/>
         <div className="relative">
      <img src={AboutDesign} alt="Image 2" className="aspect-video h-[550px] w-full object-cover " />
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-5">
        <h1 className="text-white text-5xl font-semibold  mb-4">Contact Us</h1>
        <p className='text-white text-2xl'>Get in touch with Us</p>
        <button className="bg-black text-white hover:bg-white hover:font-semibold  hover:text-black duration-300  px-6 py-2"  onClick={handleScroll} >Scroll Down</button>
      </div>
    </div>

    <div>
   
 
  <div className="flex max-w-screen-lg justify-between mx-auto flex-col md:flex-row ">
      <div className=" pr-8 text-start justify-center items-start mx-auto  space-y-10 flex flex-col ">
        <h2 className="text-lg font-bold">Contact Information</h2>
        <p className="mb-2"><span className='font-bold '>Address:</span> 123 Main Street, City, Country</p>
        <p className="mb-2"><span className='font-bold '>Email:</span> info@example.com</p>
        <p className="mb-2"><span className='font-bold '>Phone:</span> +123 456 789</p>
      </div>
      <div className="w-full md:w-1/2  ">

        <h2 className="text-3xl font-bold py-10 ">Contact Us</h2>

        
        <form className='flex flex-col' id='myform' ref={form} onSubmit={sendEmail}>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">Name:</label>
            <input className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-[#ff5450] rounded-md focus:outline-none focus:ring-pink-500" type="text" id="name" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">Email:</label>
            <input className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-[#ff5450] rounded-md focus:outline-none focus:ring-pink-500" type="email" id="email" name="email"  required />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="mobile">Mobile:</label>
            <input className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-[#ff5450] rounded-md focus:outline-none focus:ring-pink-500" type="tel" id="mobile" name="mobile" size={10}   required />
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="message">Message:</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 ring-1 ring-inset ring-[#ff5450] rounded-md focus:outline-none focus:ring-pink-500" id="message" name="message" rows="4" required></textarea>
          </div>
          <button className="px-4 py-2 w-full bg-indigo-500 text-white rounded-md hover:bg-indigo-700" type="submit">Send</button>
        </form>
      </div>
    </div>


    </div>
    <FindUs/>
    <Footer/>
    </div>
  )
}

export default ContactUs

