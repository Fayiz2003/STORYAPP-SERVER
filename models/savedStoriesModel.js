const mongoose = require('mongoose')

const saveStorySchema = new mongoose.Schema({
    storyId:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
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

const saveStories = mongoose.model("saveStories",saveStorySchema)

module.exports = saveStories