const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
   dname :{
        type : String,
        required : true,
        min : 1
    },
   quantity :{
        type : Number,
        required : true,
        min : 0
    },
   location :{
        type : String,
        required : true,
        min : 1
    },
    name :{
        type : String,
        required : true,
        min : 1
    },
    no :{
        type : String,
        required : true,
        min : 1
    },
    SEID:{
        type:String,
        required:true,
        min:1
    }
});

module.exports = mongoose.model('Order', OrderSchema);