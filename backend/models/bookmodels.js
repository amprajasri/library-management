import mongoose from 'mongoose'

const bookschema = mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
   publishyear:{
        type:Number,
        required:true
    },
},
    {
        timestamps:true
    }
)

export const Book = mongoose.model('book',bookschema);