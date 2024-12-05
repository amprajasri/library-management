import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { CreateBook } from './pages/CreateBook'
import { EditBooks } from './pages/EditBooks'
import { DeleteBooks } from './pages/DeleteBooks'
import { Home } from './pages/Home'
import { ShowBooks } from './pages/ShowBooks'
import { Login } from './pages/Login'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/books/create' element={<CreateBook/>}/>
      <Route path='/books/details/:id' element={<ShowBooks/>}/>
      <Route path='/books/edit/:id' element={<EditBooks/>}/>
      <Route path='/books/delete/:id' element={<DeleteBooks/>}/>
    </Routes>
  )
}

export default App