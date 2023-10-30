const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:String,
        
    },
    discountPersent:{
        type:Number,
    },
    quantity:{
        type:Number,
        required:true
    },
    brand:{
        type:String,
    },
    color:{
        type:String,
    },
    sizes:[
        {
            name:{type:String},
            quantity:{type:Number}
        }
    ],
    imgUrl:{
        type:stringify,

    },
    ratings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"ratings"
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"reviews"
        }
    ],
    numRatings:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }

})

const product = mongoose.model("products",productSchema)
module.exports = product