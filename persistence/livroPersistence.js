const { Client } = require('pg')
const { conexao } = require('./conexao')

async function listarLivros() {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('SELECT * FROM livro ')
    await cliente.end()
    return res.rows
}

async function insereLivro(livro) {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('INSERT INTO livro (nome, autor, editora, ano) VALUES ($1,$2,$3,$4) RETURNING *', [
        livro.nome,
        livro.autor,
        livro.editora,
        livro.ano
    ])
    await cliente.end()
    return res.rows[0]
}
// async function consultaLivro(nome) {
//     const cliente = new Client(conexao)
//     await cliente.connect()
//     const res = await cliente.query('SELECT * FROM livro WHERE nome=$1', [nome])
//     await cliente.end()
//     return res.rows[0]
// }

async function buscarLivroId(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livro WHERE id=$1', [id]);
    await cliente.end();
    return res.rows[0];
}

async function buscarLivroNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM livro WHERE nome=$1', [nome]);
    await cliente.end();
    return res.rows;
}

async function atualizarLivro(id, livro) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('UPDATE livro SET nome=$1, autor=$2, editora=$3, ano=$4 WHERE id=$5 RETURNING *', [
        livro.nome,
        livro.autor,
        livro.editora,
        livro.ano,
        id
    ]);
    await cliente.end();
    return res.rows[0]
}

async function deletarLivro(id) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM livro WHERE id=$1 RETURNING *', [id]);
    await cliente.end();
    return res.rows[0];
}

module.exports = {
    listarLivros,
    insereLivro,
    buscarLivroId,
    buscarLivroNome,
    atualizarLivro,
    deletarLivro,
    // consultaLivro
}