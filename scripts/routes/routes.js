const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {selectAll, insertNewEmployee,selectById, updateEmployee, deleteEmployee} = require('../controls/employeeOperations');
const {createUser, verifyUserAcess, verifyUserAutentication} = require('../controls/usersOperations');

router.get('/signUpScreen', (req, res) => {
    res.render('signUpScreen');
})
router.get('/', async (req, res) => {
    res.render('loginScreen');
})

router.post('/createUser', async (req, res) => {
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

router.post('/signInUser', async (req, res, next) => {

    let userVerification = await verifyUserAcess(req.body.login, req.body.password)

    if(userVerification.verified){

        const token = jwt.sign(userVerification.userData[0], process.env.JWT_PRIVATE_KEY, {expiresIn: "15m"})
        
        res.cookie('token', token, {httpOnly:true})
        res.redirect('showAll')
    }else{
        res.render('errorPage')
    }
})

router.get('/showAll', verifyUserAutentication(), async (req, res) => {
    const data = await selectAll();
    res.render('home', {'employee' : data});
})
router.get('/registerEmployee', (req, res) => {
    res.render('registerEmployee')
})

router.post('/registerEmployee',  async (req, res) => {
   const sucessTransation = await insertNewEmployee(req.body.name, req.body.sector);

   (sucessTransation)? console.log('Employee registered') : console.log('Employee NOT registered'); 

   res.redirect('/showAll');
})

router.get('/updateEmployee/:id', async (req, res) => {
    const data = await selectById(req.params.id);
    res.render('updateEmployee', {'employee': data[0]})
})

router.post('/updateEmployee', async (req, res) => {
    console.log(req.body.id, req.body.name, req.body.sector);
    const sucessTransation = await updateEmployee(req.body.id, req.body.name, req.body.sector);

    (sucessTransation)? console.log('Employee Updated') : console.log('Employee NOT Updated'); 

    res.redirect('/showAll');
})
router.get('/deleteEmployeePage/:id', async (req,res) => {
    const data = await selectById(req.params.id);
    res.render('deleteEmployeePage', {employee: data[0]})
})
router.post('/delete', async (req, res) => {
    const sucessTransation = await deleteEmployee(req.body.id);

    (sucessTransation)? console.log('Employee Deleted') : console.log('Employee NOT Deleted'); 

    res.redirect('/showAll');
})

module.exports = router