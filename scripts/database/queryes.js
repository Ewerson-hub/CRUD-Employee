const pool = require('./conection');

async function executeQuery(sql_statement, awaitReturn=true) {

    try {
        const [results] = await pool.query(sql_statement);
        return results

    }catch (error) {
        console.error('ERRO ON EXECUTE QUERY :', error);
        throw error;
    } finally {
        console.log('Operation concluida!');
    }
}


module.exports = { executeQuery }