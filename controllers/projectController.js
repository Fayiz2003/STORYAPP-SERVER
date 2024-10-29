const projects = require('../models/projectModel')


//add project
exports.addProjectController = async (req,res)=>{
    console.log("Inside addProjectController");
    
    console.log(req.userId);
    const {title,languages,overview,github,website,} = req.body
    console.log(title,languages,overview,github,website);
    console.log(req.file.filename);
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("project is already availabe in our database .....plase add another")
        }else{
            const newProject = new projects({
                title,languages,overview,github,website,projectImg:req.file.filename,userId:req.userId
            })
            await newProject.save()
            res.status(200).json(newProject) 
        }
    }catch(err){
        res.status(401).json(err)
    }
    
    // res.status(200).json("Add Project Request recieved!!!")
}

// home Project no Authentication requred
exports.getHomeProjectsController = async (req,res)=>{
    console.log("Inside homeProjectsController");
    try{
      const homeProjects = await projects.find().limit(3)
      res.status(200).json(homeProjects)
    }catch(err){
       res.status(401).json(err)
        
    }
    
}

// all Project  Authentication requred
exports.getAllProjectsController = async (req,res)=>{
    console.log("Inside getAllProjectsController");
    // get query parameter of url 
    const searchKey = req.query.search
    const query = {
        languages: {
            $regex:searchKey,$options:"i"
        }
    }
    try{
      const allProjects = await projects.find(query)
      res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
        
    }
    
}

// user Project  Authentication requred
exports.getUserProjectsController = async (req,res)=>{
    console.log("Inside getUserProjectsController");
    const userId = req.userId
    try{
      const allUserProjects = await projects.find({userId})
      res.status(200).json(allUserProjects)
    }catch(err){
        res.status(401).json(err)
        
    }
    
}

// remove project  Authentication requred
exports.removeProjectController = async (req,res)=>{
console.log("Inside removeProjectController");
const {pid} = req.params
try {
    
    const removeProject = await projects.findByIdAndDelete({_id:pid})
    res.status(200).json(removeProject)

} catch (err) {
   res.status(401).json(err) 
}
}

// edit project   Authentication requred
exports.editProjectController = async (req,res)=>{
    console.log("inside Edit Project Controller");
    const {pid} =req.params
    const {title,languages,overview,github,website,projectImg} = req.body
    const uploadImg = req.file?req.file.filename:projectImg
    const userId = req.userId
    try {
        const updateProject =  await projects.findByIdAndUpdate({_id:pid},
            {
                title,languages,overview,github,website,projectImg:uploadImg,userId
            },{new:true} )
            await updateProject.save()
            res.status(200).json(updateProject)
    } catch (err) {
        res.status(401).json(err)
    }
    
}

