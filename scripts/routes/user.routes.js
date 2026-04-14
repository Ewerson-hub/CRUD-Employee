const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {createUser, verifyUserAcess, verifyUserAutentication, getAllUsers, deleteUser, updateRole} = require('../controls/usersOperations');

router.get('/show', async (req,res) => {
    const usersData = await getAllUsers();
    res.render('showUsers', {'users': usersData})
})
router.post('/create', async (req, res) => {
    try{
        const userCreated = await createUser(req.body.login, req.body.password)
        if (userCreated){ 
            console.log('User Created !') 
            res.redirect('/'); 
        }
    } catch (error){
        console.log('Error on create user => ', error);
    } 
})
router.get('/delete/:id', async (req, res) =>{ 
    await deleteUser(req.params.id)
    res.redirect('/user/show')
})

router.get('/updateRole/:id/:role', async (req, res) => {
    const role = (req.params.role == 0)? 1 : 0;
    await updateRole(req.params.id, role);
    res.redirect('/user/show')
})

// ======== LOGIN 
router.get('/signUp', (req, res) => {
    res.render('signUpScreen');
})

router.post('/signIn', async (req, res, next) => {

    let userVerification = await verifyUserAcess(req.body.login, req.body.password)

    if(userVerification.verified){

        const token = jwt.sign(userVerification.userData[0], process.env.JWT_PRIVATE_KEY, {expiresIn: "15m"})
        
        res.cookie('token', token, {httpOnly:true})
        res.redirect('/employee/show')
    }else{
        res.render('errorPage')
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/')
})

module.exports = router