import Card4 from './Card4'
import Shoes from "../assets/images/Shoes2.jpg";
import Image5 from "../assets/images/Image5.jpg";


const StayUpdated = () => {
  return (
    <div className='flex flex-col md:flex-row  max-w-screen-xl mx-auto '>
    <Card4 image={Shoes} title={"Updates"} desc={"Ecommerce"}/>
    <Card4 image={Image5} title={"We Launched ProStore..."} desc={"10 Outfit Ideas For This Coming Summer"}/>
    </div>
  )
}

export default StayUpdated