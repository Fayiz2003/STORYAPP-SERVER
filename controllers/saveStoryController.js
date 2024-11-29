const saveStories = require('../models/savedStoriesModel')

//add to save collection
exports.addStoryToSaveCollectionController = async (req,res)=>{
    console.log("Inside addStoryToSaveCollectionController");
    const {id,title,category,storyImg} = req.body
    const userId = req.userId
    try{
        const existingStory = await saveStories.findOne({storyId:id})
        if(existingStory){
            res.status(406).json("Selected Story is already in your Favourites. Please Add another!!")
        }else{
            const newStory = new saveStories({
                storyId:id,title,category,storyImg,userId
            })
            await newStory.save()
            res.status(200).json(newStory)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

//get save story
exports.getUserSavedStoryController = async (req,res)=>{
    console.log("Inside getUserSavedStoryController");
    const userId = req.userId
    try{
        const allSavedStory = await saveStories.find({userId})
        res.status(200).json(allSavedStory)
    }catch(err){
        res.status(401).json(err)
    }
}

//remove Story
exports.removeSavedStoryController = async (req,res)=>{
    console.log("Inside removeSavedStoryController");
    const {id} = req.params    
    try{
        const removeStory = await saveStories.findByIdAndDelete({_id:id})
        res.status(200).json(removeStory)
    }catch(err){
        res.status(401).json(err)
        console.log("errrrrrrrrrrrrrrrrr");
    }
}