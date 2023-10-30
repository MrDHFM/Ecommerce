const { default: mongoose } = require("mongoose");

const addressSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    streetAddress:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    zipCode:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    mobile:{
        type:String,
        required:true
    }
})

const address = mongoose.model("addresses",addressSchema)
module.exports = address;