import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { Input} from 'antd';
import Spinner from '../components/spinner'
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdDeleteOutline, MdOutlineAddBox,MdOutlineDelete} from 'react-icons/md'
import { BooksTable } from '../components/BooksTable'
import { BooksCard } from '../components/BooksCard'

const { Search } = Input;

export const Home = () => {
  const [books,setBooks]= useState([]);
  const [loading, setLoading] = useState(false);
  const [showType , setShowType] = useState('Table')
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [username, setUsername] = useState('');
  const userId=sessionStorage.getItem('userId')
  
  const navigate = useNavigate();
  const handleLogout=()=>{
   sessionStorage.removeItem(userId)
   sessionStorage.removeItem(username)
   navigate('/')
  }
  useEffect(() => {
    // Get username from sessionStorage
    const storedUsername = sessionStorage.getItem("username");
    
    // If no username is found, redirect to login
    if (!storedUsername) {
      navigate('/');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);
  useEffect(()=>{
    setLoading(true);
    axios
    .get('https://library-management-backend-blond.vercel.app/books',{
      params: { userId } 
      

    })
     .then((response)=>{
        setBooks(response.data.data)
     setLoading(false)
        
    })
    .catch((error)=>{
   console.log(error)
  setLoading(false)
    })
    
  },[])
 
  useEffect(() => {
    const results = books.filter(book => 
      book?.title?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
    console.log(results)
  }, [searchTerm]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(true)
    setSearchTerm(e);
  };

  return (
    <div className='p-4 '>
  {/* Enhanced Header Section */}
  <div className='bg-blue-50 border-b border-blue-100 shadow-sm mb-6 p-4'>
    <div className='flex justify-between items-center gap-4'>
      <h2 className='text-2xl font-semibold text-gray-800 whitespace-nowrap'>
        Hello {username}!
      </h2>
      
      {/* Search bar with flex-grow to take available space */}
      <div className='flex-grow max-w-2xl'>
        <Search
          placeholder="Search books..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearchChange}
          className='w-full'
        />
      </div>
      
      <button 
        onClick={handleLogout}
        className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 whitespace-nowrap ml-4'
      >
        Logout
      </button>
    </div>
  </div>

  {/* Rest of the content */}
  <div className="flex justify-center items-center gap-x-4 m-4">
    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('Table')}>Table</button>
    <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('Card')}>Card</button>
  </div>

  <div className='flex justify-between items-center'>
    <h1 className='text-3xl my-8'>Books List</h1>
    <Link to='/books/create'>
      <MdOutlineAddBox className='text-sky-800 text-4xl' />
    </Link>
  </div>

  {loading ? (
    <Spinner/>
  ) : showType === 'Table' ? (
    search ? <BooksTable books={filteredBooks} /> : <BooksTable books={books} />
  ) : (
    search ? <BooksCard books={filteredBooks} /> : <BooksCard books={books} />
  )}
</div>

  )
}
