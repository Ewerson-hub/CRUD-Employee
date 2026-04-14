const express = require('express');
const router = express.Router();
const {selectAll, insertNewEmployee,selectById, updateEmployee, deleteEmployee} = require('../controls/employeeOperations');

router.get('/show', async (req, res) => {
    const data = await selectAll();
    res.render('home', {'employee' : data});
})
router.route('/register')
    .get((req, res) => {
        res.render('registerEmployee')
    })
    .post(async (req, res) => {
        const sucessTransation = await insertNewEmployee(req.body.name, req.body.sector);
        (sucessTransation)? console.log('Employee registered') : console.log('Employee NOT registered'); 
        res.redirect('/employee/show');
    })

router.get('/update/:id', async (req, res) => {
    const data = await selectById(req.params.id);
    res.render('updateEmployee', {'employee': data[0]})
})

router.post('/update', async (req, res) => {
    console.log(req.body.id, req.body.name, req.body.sector);
    const sucessTransation = await updateEmployee(req.body.id, req.body.name, req.body.sector);

    (sucessTransation)? console.log('Employee Updated') : console.log('Employee NOT Updated'); 

    res.redirect('/employee/show');
})

router.get('/delete/:id', async (req,res) => {
    const data = await selectById(req.params.id);
    res.render('deleteEmployeePage', {employee: data[0]})
})

router.post('/delete', async (req, res) => {
    const sucessTransation = await deleteEmployee(req.body.id);

    (sucessTransation)? console.log('Employee Deleted') : console.log('Employee NOT Deleted'); 

    res.redirect('/employee/show');
})

module.exports = router