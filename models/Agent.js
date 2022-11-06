const mongoose = require('mongoose');
const AgentSchema = new mongoose.Schema({
   name :{
        type : String,
        required : true,
        min : 1
    },
    email:{
        type:String,
        required :true,
        min:1
    },
   sector :{
        type : Number,
        required : true,
        min : 0
    },
    status:{
        type: String,
        required : true,
        min : 1
    },
});

module.exports = mongoose.model('Agent', AgentSchema);