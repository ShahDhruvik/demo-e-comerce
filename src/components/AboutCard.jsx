import AboutCard1 from '../assets/images/AboutCard1.jpg'
import Flag from '../assets/images/Falg.jpg'

const AboutCard = () => {
  // const [showExtraText, setShowExtraText] = useState(false);
  return (
    <div className='max-w-screen-lg mx-auto mt-10'>
    <div className='flex flex-col md:flex-row space-x-10 gap-4  '>
            <div>
                <img src={AboutCard1} alt='' className='aspect-square h-[543px] object-cover'/>
            </div>
            <div className='justify-center text-center flex flex-col items-center mx-auto space-y-7   '>
                <h1 className='text-[40px]'>Hard working and friendly team</h1>
                <p className='text-lg'>Update classic clothing from our main store</p>
                {/* {showExtraText && <p>To get more Information about us, contact us, and we will notify you our daily updates </p>} */}
                <button className="bg-black text-white hover:bg-white hover:font-semibold  hover:text-black duration-300  px-6 py-2" >Learn More</button>

            </div>
    </div>
    <div className='flex flex-col-reverse mt-5 md:mt-0 md:flex-row  gap-4   '>
        
            <div className='justify-center text-center flex flex-col items-center mx-auto space-y-7     '>
                <h1 className='text-[40px]'>Quality made in the USA</h1>
                <p className='text-lg'>Update classic clothing from our main store</p>
                <button className="bg-black text-white hover:bg-white hover:font-semibold  hover:text-black duration-300  px-6 py-2" >Learn More</button>

            </div>
            <div>
                <img src={Flag} alt='' className='aspect-square h-[543px] object-cover '/>
            </div>
    </div>
    </div>
  )
}

export default AboutCard