const stories = require('../models/storyModel')


//add story  --
exports.addStoryController = async (req,res)=>{
    console.log("Inside addStoryController");
    console.log(req.userId);
    const {title,author,date,category,description,paragraph} = req.body
    console.log(title,author,date,category,description,paragraph);
    console.log(req.file.filename);
    try{
        const existingStory = await stories.findOne({title})
        if(existingStory){
            res.status(406).json("Story is already availabe in our database .....plase add another")
        }else{
            const newStory = new stories({
                title,author,date,category,description,paragraph,storyImg:req.file.filename,userId:req.userId
            })
            await newStory.save()
            res.status(200).json(newStory) 
        }
    }catch(err){
        res.status(401).json(err)
    }
    }

// home Story no Authentication requred
exports.getHomeStoriesController = async (req,res)=>{
    console.log("Inside getHomeStoriesController");
    try{
      const homeStories = await stories.find().limit(3)
      res.status(200).json(homeStories)
    }catch(err){
       res.status(401).json(err)
        
    }
    
}

// all story  Authentication requred
exports.getAllStoriesController = async (req,res)=>{
    console.log("Inside getAllStoriesController");
    // get query parameter of url 
    const searchKey = req.query.search
    const query = {
        category: {
            $regex:searchKey,$options:"i"
        }
    }
    try{
      const allStories = await stories.find(query)
      res.status(200).json(allStories)
    }catch(err){
        res.status(401).json(err) 
    }
}

// admin story  Authentication requred  --
exports.getAdminStoryController = async (req,res)=>{
    console.log("Inside getAdminStoryController");
    try{
      const allAdminStories = await stories.find()
      res.status(200).json(allAdminStories)
    }catch(err){
        res.status(401).json(err)  
    }
}

// remove story  Authentication requred  --
exports.removeStoryController = async (req,res)=>{
  console.log("Inside removeStoryController");
  const {sid} = req.params
  try {
      const removeStory = await stories.findByIdAndDelete({_id:sid})
      res.status(200).json(removeStory)
  } catch (err) {
     res.status(401).json(err) 
  }
}

// edit story  Authentication requred --
exports.editStoryController = async (req,res)=>{
    console.log("inside editStoryController");
    const {sid} =req.params
    const {title,author,date,category,description,paragraph,storyImg} = req.body
    const uploadImg = req.file?req.file.filename:storyImg
    const userId = req.userId
    try {
        const updateStory =  await stories.findByIdAndUpdate({_id:sid},
            {
                title,author,date,category,description,paragraph,storyImg:uploadImg,userId
            },{new:true} )
            await updateStory.save()
            res.status(200).json(updateStory)
    } catch (err) {
        res.status(401).json(err)
    }
}

//getAStory
exports.getAStoryController = async (req,res)=>{
    console.log("Inside getAStoryController");
    const {id} = req.params
    try{
        const viewStory = await stories.findOne({_id:id})
        res.status(200).json(viewStory)
    }catch(err){
        res.status(401).json(err)
    }
}
