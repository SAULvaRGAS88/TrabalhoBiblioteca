const {Client} = require('pg')
const {conexao} = require('./conexao')

async function listarLivros() {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('SELECT * FROM livro ')
    await cliente.end()
    return res.rows
}

module.exports = {
    listarLivros,

}