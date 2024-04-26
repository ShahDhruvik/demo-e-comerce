import AboutDesign from "../assets/images/AboutCard.jpg";
import AboutDesign2 from "../assets/images/AboutCard2.jpg";
import AboutDesign21 from "../assets/images/AboutCard21.jpg";
import AboutDesign22 from "../assets/images/AboutCard22.jpg";
import { ReactComponent as Trolly } from '../assets/svg/Trolly.svg';
import { ReactComponent as CreditCard } from '../assets/svg/CreditCard.svg';
import { ReactComponent as Lock } from '../assets/svg/Lock.svg';
import AboutCard from '../components/AboutCard';
import Footer from './Footer';
import FindUs from '../components/Find Us';



const AboutUs = () => {
    const handleScroll = () => {
        window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth',
        });
      }
  return (
    <div className=' '>
    <div className="relative">
      <img src={AboutDesign} alt="Image 2" className="aspect-video h-[550px] w-full object-cover " />
      <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center space-y-5">
        <h1 className="text-white text-5xl font-semibold  mb-4">About Us</h1>
        <p className='text-white text-2xl'>Get to Know Us</p>
        <button className="bg-black text-white hover:bg-white hover:font-semibold  hover:text-black duration-300  px-6 py-2" onClick={handleScroll}>Scroll Down</button>
      </div>
    </div>

    <div className=' text-center space-y-20  max-w-screen-xl mx-auto  py-10'>
        <div className='text-sm space-y-3'>
            <h1 className='font-semibold text-5xl'>Know Who We are</h1>
            <p>Lorem ipsum dolor sit amet.</p>
        </div>
        <div className='flex justify-evenly flex-col gap-8 md:flex-row'>
            <div className='space-y-3'>
                <CreditCard className="mx-auto rounded-full bg-slate-400 p-3 "/>
                <h1 className='font-semibold text-xl'>Full  Support</h1>
            <p>Lorem ipsum dolor sit amet.</p>

            </div>
            <div className='space-y-3'>
                <Trolly className="mx-auto rounded-full bg-slate-400 p-3 "/>
            <h1 className='font-semibold text-xl'>Best Store</h1>
            <p>Lorem ipsum dolor sit amet.</p>

            </div>
            <div className='space-y-3'>
                <Lock className="mx-auto rounded-full bg-slate-400 p-3 "/>
            <h1 className='font-semibold text-xl'>Safe Shopping</h1>
            <p>Lorem ipsum dolor sit amet.</p>

            </div>
        </div>
    </div>

    <AboutCard/>
    <div className='py-10  max-w-screen-xl mx-auto'>
        <div><h1 className='text-center text-4xl py-10'>These are some of our numbers</h1></div>
        <div className='flex  justify-evenly flex-col gap-4 md:flex-row '>
            <div><img src={AboutDesign2} alt='' className='aspect-[3/4] w-[340px] mx-auto'/>
            <div className='flex  flex-col text-center space-y-3'><h1 className='text-5xl font-serif pt-5'>3100+</h1>
            <p className='text-lg font-semibold'>More than 3700 Social Friends</p></div>
            </div>
            <div><img src={AboutDesign21} alt='' className='aspect-[3/4] w-[340px] mx-auto'/>
            <div className='flex  flex-col text-center space-y-3'><h1 className='text-5xl font-serif pt-5'>5100k</h1>
            <p className='text-lg font-semibold'>More than 5000 happy clients</p></div>
            </div>
            <div><img src={AboutDesign22} alt='' className='aspect-[3/4] w-[340px] mx-auto'/>
            <div className='flex  flex-col text-center space-y-3'><h1 className='text-5xl font-serif pt-5'>100%</h1>
            <p className='text-lg font-semibold'>Only used quality materials</p></div>
            </div>
        </div>
    </div>
    <FindUs/>
    <Footer/>

  </div>
  )
}

export default AboutUs