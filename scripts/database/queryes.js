const pool = require('./conection');

function executeQuery(sql_statement, awaitReturn=true) {

    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) throw err;

            conn.query(`${sql_statement}`, (err, results, fields) => {
                if (err) throw err;

                resolve(results)
            })
            pool.releaseConnection(conn);
        })
    })
    .then(data => {
        if(awaitReturn) return data
    })
    .finally(() => console.log('Oparation concluida !'))
}


module.exports = { executeQuery }