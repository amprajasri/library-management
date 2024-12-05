import express from 'express'
import { Book } from '../models/bookmodels.js'
const router = express.Router()

router.post('/',async(request,response) =>
    {
      try{
        console.log(request.body.title+request.body.author+request.body.publishyear);
        if(
          !request.body.title||
          !request.body.author||
          !request.body.publishyear
         
        ){
          return response.status(400).send({message:"missing values,send all required feilds"})
        }
        const newbook = {
          title:request.body.title,
          author:request.body.author,
          publishyear:request.body.publishyear
        }
      const book = await Book.create(newbook);
      return response.status(234).send(book)   
      }
      catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
      }
    })
  
router.get('/',async (request,response)=>{
      try{
          const book = await Book.find({})
          console.log(book.length)
          return response.status(201).json({count:book.length,
            data:book
          }) //json.(book) is sending book to the client
      }
      catch{
        console.log(error.message)
        return response.status(500).send({message:error.message})
      }
    })
router.get('/:id',async (request,response)=>{
      try{
            const {id}= request.params
          const book = await Book.findById(id)
         
          return response.status(201).json(book) 
      }
      catch{
        console.log(error.message)
        return response.status(500).send({message:error.message})
      }
    })
  
router.put('/:id',async(request,response) =>
      {
        try{
          if(
            !request.body.title||
            !request.body.author||
            !request.body.publishyear
          ){
            return response.status(400).send({message:"missing values,send all required feilds"})
          }
         const {id} = request.params
         const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result){ return response.status(404).send({message:"book not found"})}
          return response.status(200).send({message:"book updated successfully"})
        }
        catch(error){
          console.log(error.message);
          response.status(500).send({message:error.message});
        }
      })
  
router.delete('/:id',async(request,response) =>
        {
    try{
           const {id} = await request.params
           const result = await Book.findByIdAndDelete(id)
          if(!result){ return response.status(404).send({message:"book not found"})}
            return response.status(200).send({message:"book deleted successfully"})
          }
          catch(error){
            console.log(error.message);
            response.status(500).send({message:error.message});
          }
        })    

export default router        