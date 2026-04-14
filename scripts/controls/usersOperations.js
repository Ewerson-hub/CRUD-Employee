const {executeQuery} = require('../database/queryes');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const round = 10;
const secret = process.env.SECRET_PEPPER


const createUser = async (login, pass) => {
    try{
        const user = await getUserData(login);
        
        if(user.length == 0){
            const hash = await bcrypt.hash(pass + secret, round)
           
            await executeQuery("INSERT INTO users (login, password) VALUES (?, ?)", [login, hash])

            return true;
        }else{
            console.log('user already existis')
            return false
        }
        
    }catch(error){
        console.log(error);
        return false
    }   
}
//Melhorar futuramente, não está aceitavel uma função com 2 tarefas
//Buscar uma forma de separar o envio dos dados do usuario e a verificação de acesso sem afetar o consumo de memoria/varias chamadas de funções
const verifyUserAcess = async (login, pass) => {
    try {
        const userData = await getUserData(login, true)

        if(userData.length == 0) return false

        const verified = bcrypt.compare(pass + secret, userData[0].password)

        return {'verified': verified, 'userData': userData}
        
    } catch (error) {
        console.log('User not found', error)
        return false
    }
}

const getUserData = async(login, passRequired=false) => {
    try{
        if(passRequired){
            return await executeQuery("SELECT * FROM users WHERE login = ?", [login])
        }else{
            return await executeQuery("SELECT login FROM users WHERE login = ?", [login])
        }
    }catch(error){
        console.log(error)
    }

}
const getAllUsers = async () => {
    try{
        return await executeQuery("SELECT id,login, is_admin FROM users WHERE login != 'root'")
    }catch(error){
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try{
        await executeQuery("DELETE FROM users WHERE id = ?", [id])
        console.log('User has been deleted !')
    }catch(error){
        console.log('Error on deleting user ',error)
    }
}
const updateRole = async (id, role) => {
    try{
        await executeQuery("UPDATE users SET is_admin = ? WHERE id = ? ", [role, id])
        console.log('User Role has been Updated !')
    }catch(error){
        console.log('Error on updating user ',error)
    }
}

const verifyUserAutentication = () => { 
    return (req, res, next) => {
        try{
            const token = req.cookies.token;
            //token invalido
            if(!token){ res.status(401).render('errorPage') }

            const verifiedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

            //autenticação invalida
            if(!verifiedToken){ res.status(403).render('errorPage') }

            if(verifiedToken){
                res.locals.is_admin = Boolean(verifiedToken.is_admin);
                next();
            }      

        }catch(error){
            res.render('errorPage')
        }

        
    } 
}
module.exports = {createUser, verifyUserAcess, getAllUsers, verifyUserAutentication, deleteUser, updateRole}