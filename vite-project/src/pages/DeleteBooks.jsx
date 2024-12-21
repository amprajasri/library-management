import React,{useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSnackbar } from 'notistack'

export const DeleteBooks = () => {
  const [loading,setLoading] = useState(false)
const navigate= useNavigate();
const {enqueueSnackbar} = useSnackbar()
const {id} = useParams()
const handleDeleteBook =() =>{
  setLoading(true);
  axios
  .delete(`http://localhost:8888/books/${id}`)
  .then(()=>{
    setLoading(false);
    enqueueSnackbar('book deleted successfully', {variant:'success'})
    navigate('/Home');
 })
 .catch((error)=>{
setLoading(false);
// alert('An error occoured');
enqueueSnackbar('error occoured', {variant:'error'})
console.log(error);
 })
};
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-8'>Delete Book</h1>
      {loading ? ( <Spinner/> ) :''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <h3 className='text-2xl'>are you sure you want to delete book</h3>
        <button className='p-4 bg-red-600 text-white m-8 width-85%' onClick={handleDeleteBook}>yes! delete book</button>
      </div>
    
    </div>
  )
}
