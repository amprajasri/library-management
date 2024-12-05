
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const BackButton = ({destination='/'}) => {       //if doesn't pass then destination will be / by default
  return (
    <div className='flex'>
      <Link to={destination} className='bg-sky-800 text-white px-4 py-1 rounded-lg w-fit'>
        <BsArrowLeft className='text-2xl'/>
      </Link>  
   </div>
  )
}

export default BackButton