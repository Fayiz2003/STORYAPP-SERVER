const express = require('express')
const userController = require('../controllers/userController')
const storyController = require('../controllers/storyController')
const saveStoryController = require('../controllers/saveStoryController')
const jwtMiddleware = require('../middlewares/jwtMiddileware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const router = new express.Router()

// register : post request to http://localhost:3000/register ---
router.post('/register',userController.registerController)

// login : post request to http://localhost:3000/login ---
router.post('/login',userController.loginController)

// add story : post request to http://localhost:3000/add-story ---
router.post('/add-story',jwtMiddleware,multerMiddleware.single('storyImg'),storyController.addStoryController)

// home stories : get request to http://localhost:3000/home-stories --
router.get('/home-stories',storyController.getHomeStoriesController)

// All stories : get request to http://localhost:3000/all-stories --
router.get('/all-stories',jwtMiddleware,storyController.getAllStoriesController)

// admin stories : get request to http://localhost:3000/admin-stories       ---
router.get('/admin-stories',jwtMiddleware,storyController.getAdminStoryController)

// remove story : get request to http://localhost:3000/remove-story ---
router.delete('/:sid/remove-story',jwtMiddleware,storyController.removeStoryController) 

// edit project : put request to http://localhost:3000/edit-project --
router.put('/:sid/edit-story',jwtMiddleware,multerMiddleware.single("storyImg"), storyController.editStoryController) 

// edit user :put request to  http://localhost:3000/user/edit --
router.put('/user/edit',jwtMiddleware,multerMiddleware.single("profilePic"),userController.editProfileController)

//storyview get request to http://localhost:3000/stories/:id/view --
router.get('/stories/:id/view',jwtMiddleware,storyController.getAStoryController)

// All users : get request to http://localhost:3000/all-users 
router.get('/all-users',userController.getAllUsersController)

//save story --
router.post('/story/save',jwtMiddleware,multerMiddleware.single("storyImg"),saveStoryController.addStoryToSaveCollectionController)

//get saved story --
router.get('/all-saved-stories',jwtMiddleware,saveStoryController.getUserSavedStoryController)

//saved-story/:id/remove --
router.delete('/saved-story/:id/remove',jwtMiddleware,saveStoryController.removeSavedStoryController)

//get single user details --
router.get('/single-user',jwtMiddleware,userController.getSingleUserController)

// remove user : get request to http://localhost:3000/remove-user 
router.delete('/:id/remove-user',jwtMiddleware,userController.removeUserController) 

//get UserDetails by Email
router.get('/user-email',userController.userEmailGetController)

//reset password
router.put('/reset-password',userController.resetPasswordController)

// export router
module.exports = router 