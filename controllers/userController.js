const users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//register logic
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    console.log(req);
    const {username,email,password} = req.body
    console.log(username,email,password);
    //check email is present in mongodb
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            //already user
            res.status(406).json("Account already exist!! Please login...")
        }else{
            //register user
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({
                username,email,password:encryptedPassword,nickName:"",phoneNum:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        
    }catch(err){
        res.status(401).json(err)
    }
}

// login logic
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    
    const { email, password } = req.body; // Get email and password from the request body
    console.log(email, password);

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "Invalid email/password" });
        }
        // Compare the input password with the hashed password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid email/password" });
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD);
        // Respond with user data and token
        res.status(200).json({
            user: existingUser,token,
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
};


// profile updation logic autherization required
exports.editProfileController = async (req,res)=>{
    console.log("Inside editProfileController");
    const {username,email,password,nickName,phoneNum,profilePic} = req.body
    const uploadImg = req.file?req.file.filename:profilePic
    const userId = req.userId
    try{
      const updateUser = await users.findByIdAndUpdate({_id:userId},{
        username,email,password,nickName,phoneNum,profilePic:uploadImg
      },{new:true})
      await updateUser.save()
      res.status(200).json(updateUser)
    }catch(err){
        res.status(401).json(err)
    }
}

exports.getAllUsersController = async (req, res) => {
    console.log("Inside getAllUsersController");
    try {
        const allUsers = await users.find({ role: {$ne:"admin"} });
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(401).json(err);
    }
};

//get single user detail
exports.getSingleUserController = async (req,res)=>{
        console.log("Inside getSingleUsersController");
        const userId = req.userId
        try{
            const userDetails = await users.findById(userId)
            res.status(200).json(userDetails)
        }catch(err){
            res.status(401).json(err)
        }
    }

 // remove users
exports.removeUserController = async (req,res)=>{
    console.log("Inside removeUserController");
    const {id} = req.params
    try {
        const removeUser = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeUser)
    } catch (err) {
       res.status(401).json(err) 
    }
  }   

// Get user details by email
exports.userEmailGetController = async (req, res) => {
    console.log("Inside userEmailGetController");
    try {
        const user = await users.find();
        if (user) {
            res.status(200).json({
                user,
            });
        } else {
            res.status(404).json({message: "User not found with the provided email",});
        }
    } catch (err) {
        console.error("Error in userEmailGetController:", err);
        res.status(401).json({
            message: "Internal Server Error",
            error: err.message,
        });
    }
};

//change password

exports.resetPasswordController = async (req, res) => {
    console.log("Inside resetPasswordController");
  
    const { id, password } = req.body; // Destructure both ID and password from the request body
  
    try {
      // Validate input
      if (!id || !password) {
        return res.status(400).json({ message: "Missing required fields." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Update user password with hashed password
      const updatedUser = await users.findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }
  
      res.status(200).json({ message: "Password updated successfully!" });
    } catch (err) {
      console.error("Error resetting password:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  };