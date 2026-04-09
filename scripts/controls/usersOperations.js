const {executeQuery} = require('../database/queryes');
const bcrypt = require("bcrypt");
const round = 10;


const createUser = async (login, pass) => {
    try{
        const hash = await bcrypt.hash(pass + process.env.SECRET_PEPPER, round)
        
        await executeQuery("INSERT INTO users (login, password) VALUES (?, ?)", [login, hash])

        return true;
        
    }catch(error){
        console.log(error);
        return false
    }   
}
const verifyUserAcess = async (login, pass) => {
    try {
        const userData = await executeQuery("SELECT * FROM users WHERE login = ?", [login])

        if(userData.length == 0) return false

        const verified = bcrypt.compare(pass + process.env.SECRET_PEPPER, userData[0].password)

        return verified
        
    } catch (error) {
        console.log('User not found', error)
        return false
    }
}
module.exports = {createUser, verifyUserAcess}