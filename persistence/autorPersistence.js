const { Client } = require('pg')
const { conexao } = require('./conexao')

async function insereAutor(autor) {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('INSERT INTO autor (nome,pais_origem) VALUES ($1, $2) RETURNING *', [
        autor.nome,
        autor.pais_origem
    ])
    await cliente.end()
    return res.rows[0]
}

async function listarAutores() {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('SELECT * FROM autor')
    await cliente.end()
    return res.rows
}

async function buscarAutorId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM autor WHERE id=$1', [id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarAutorNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM autor WHERE nome=$1', [nome]);
    await cliente.end();
    return res.rows[0];
}

async function atualizarAutor(id, autor) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('UPDATE autor SET nome=$1, pais_origem=$2 WHERE id=$3 RETURNING *', [
        autor.nome,
        autor.pais_origem,
        id
    ]);
    await cliente.end();
    return res.rows[0]
}

async function deletarAutor(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM autor WHERE id=$1 RETURNING *', [id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    insereAutor,
    listarAutores,
    buscarAutorId,
    buscarAutorNome,
    atualizarAutor,
    deletarAutor
}
    
