const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    category:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    paragraph:{
        type:String,
        required:true
    },
    storyImg:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

const stories = mongoose.model("stories",storySchema)
module.exports = stories