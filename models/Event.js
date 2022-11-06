const mongoose = require('mongoose');
const EventSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,
        min: 1,
        
    },
    img :{
        type:String,
        required :true,
        min:1
    },
    description: {
        type: String,
        required: true,
        min: 1
    },
    sector: {
        type: Number,
        required: true,
        min: 0
    },
    contact:{
        type: String,
        required:true,
        min:1
    },
    email:{
        type: String,
        required:true,
        min:1
    },
 
   
   Eorders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model('Event', EventSchema);
