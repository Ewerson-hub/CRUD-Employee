const express = require('express');
const router = express.Router();
const {selectAll, insertNewEmployee,selectById, updateEmployee, deleteEmployee} = require('../controls/controls');


router.get('/', async (req, res) => {
    const data = await selectAll();
    res.render('home', {'employee' : data});
})

router.get('/registerEmployee', (req, res) => {
    res.render('registerEmployee')
})

router.post('/registerEmployee',  async (req, res) => {
   const sucessTransation = await insertNewEmployee(req.body.name, req.body.sector);

   (sucessTransation)? console.log('Employee registered') : console.log('Employee NOT registered'); 

   res.redirect('/');
})

router.get('/updateEmployee/:id', async (req, res) => {
    const data = await selectById(req.params.id);
    res.render('updateEmployee', {'employee': data[0]})
})

router.post('/updateEmployee', async (req, res) => {
    console.log(req.body.id, req.body.name, req.body.sector);
    const sucessTransation = await updateEmployee(req.body.id, req.body.name, req.body.sector);

    (sucessTransation)? console.log('Employee Updated') : console.log('Employee NOT Updated'); 

    res.redirect('/');
})
router.get('/deleteEmployeePage/:id', async (req,res) => {
    const data = await selectById(req.params.id);
    res.render('deleteEmployeePage', {employee: data[0]})
})
router.post('/delete', async (req, res) => {
    const sucessTransation = await deleteEmployee(req.body.id);

    (sucessTransation)? console.log('Employee Deleted') : console.log('Employee NOT Deleted'); 

    res.redirect('/');
})

module.exports = router