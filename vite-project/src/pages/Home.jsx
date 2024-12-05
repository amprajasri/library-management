import React, {useEffect, useState } from 'react'
import axios from 'axios'
import { Input} from 'antd';
import Spinner from '../components/spinner'
import {Link} from 'react-router-dom'
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

  useEffect(()=>{
    setLoading(true);
    axios
    .get('http://localhost:8888/books')
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
    <div className='p-4'>
      <Search
      placeholder="input search text"
      allowClear
      enterButton="Search"
      size="large"
      onSearch={handleSearchChange}
    />
        
      <div className="flex justify-center items-center gap-x-4 m-4">
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('Table')}>Table</button>
        <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg' onClick={() => setShowType('Card')}>Card</button>
      </div>
      <div className='flex justify-betweem items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to='/books/create'z>
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
