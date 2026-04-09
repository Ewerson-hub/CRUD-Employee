const pool = require('./conection');

async function executeQuery(sql_statement, variables) {

    try {
        const [results] = await pool.execute(sql_statement, variables)
        return results

    }catch (error) {
        console.error('ERRO ON EXECUTE QUERY :', error);
        throw error;
    } finally {
        console.log('Operation concluida!');
    }
}


module.exports = { executeQuery }