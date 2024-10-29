const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddileware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()

// register : post request to http://localhost:3000/register
router.post('/register',userController.registerController)
// login : post request to http://localhost:3000/login
router.post('/login',userController.loginController)
// add project : post request to http://localhost:3000/add-project
router.post('/add-project',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)

// home projects : get request to http://localhost:3000/home-projects
router.get('/home-projects',projectController.getHomeProjectsController)
// All projects : get request to http://localhost:3000/all-projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)
// user projects : get request to http://localhost:3000/user-projects
router.get('/user-projects',jwtMiddleware,projectController.getUserProjectsController)
// remove project : get request to http://localhost:3000/remove-project
router.delete('/:pid/remove-project',jwtMiddleware,projectController.removeProjectController) 
// edit project : put request to http://localhost:3000/edit-project
router.put('/:pid/edit-project',jwtMiddleware,multerMiddleware.single("projectImg"), projectController.editProjectController) 
// edit user :put request to  http://localhost:3000/user/edit
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editProfileController)


// export router
module.exports = router 