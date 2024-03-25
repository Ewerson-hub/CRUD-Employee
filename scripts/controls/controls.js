const {executeQuery} = require('../database/queryes');

const selectAll = () => {
    return executeQuery('SELECT id,name,sector FROM employee').then(data => {
        return data;
    })
}
const selectById = (id) => {
    return executeQuery(`SELECT id,name,sector FROM employee WHERE id='${id}'`).then(data => {
        return data;
    })
}
const insertNewEmployee = (name, sector) => {
    return executeQuery(`INSERT INTO employee (name, sector) VALUES ('${name}','${sector}')`, false)
    .then(() => {return {sucess: true}})
    .catch(() => {return {sucess: false}})
}

const updateEmployee = (id, name, sector) => {
    return executeQuery(`UPDATE employee SET name='${name}', sector='${sector}' WHERE id='${id}'`, false)
    .then(() => {return {sucess: true}})
    .catch(() => {return {sucess: false}})
}

const deleteEmployee = (id) => {
    return executeQuery(`DELETE FROM employee WHERE id='${id}'`, false)
    .then(() => {return {sucess: true}})
    .catch(() => {return {sucess: false}})
}

module.exports = {selectAll, insertNewEmployee,selectById, updateEmployee, deleteEmployee}