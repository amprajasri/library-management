import React,{useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [author,setAuthor] = useState('');
  const [publishyear,setPublishYear]=useState('')
  const [loading,setLoading] = useState(false)
  const navigate= useNavigate();
  const { enqueueSnackbar } = useSnackbar()
  const userId = sessionStorage.getItem('userId');
  const handleSaveBook =() =>{
    const data ={
      userId,
      title,
      author,
      publishyear
    };
    setLoading(true);
    axios
    .post('http://localhost:8888/books',data)
    .then(()=>{
      setLoading(false);
      enqueueSnackbar('book created successfully ', {variant:'success'})
      navigate('/Home');
   })
   .catch((error)=>{
 setLoading(false);
//  alert('An error occoured');
enqueueSnackbar('An error occoured :(', {variant:'error'})
 console.log(error);
   })
  };

  return (
  <div className='p-4'>
    <BackButton/>
    <h1 className='text-3xl my-8'>Create Book</h1>
    {loading ? ( <Spinner/> ) :''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
          <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Title</label>
          <input 
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Author</label>
          <input 
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <div className='my-4'>
          <label className='text-xl mr-4 text-grey-500'>Publish Year</label>
          <input 
            type='text'
            value={publishyear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'/>
          </div>
          <button className='p-2  bg-sky-300 m-8' onClick={handleSaveBook}>Save</button>
      </div>
    

    
  </div>
  );
}
