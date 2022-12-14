const { Client } = require('pg')
const { conexao } = require('./conexao')

async function insereUsuario(usuario) {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('INSERT INTO usuario (nome, telefone, qtd_livros) VALUES ($1,$2,$3) RETURNING *', [
        usuario.nome,
        usuario.telefone,
        usuario.qtd_livros 
    ])
    await cliente.end()
    return res.rows[0]
}

async function listarUsuarios() {
    const cliente = new Client(conexao)
    await cliente.connect()
    const res = await cliente.query('SELECT * FROM usuario ')
    await cliente.end()
    return res.rows
}


async function buscarUsuarioMatricula(matricula) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM usuario WHERE matricula=$1', [matricula]);
    await cliente.end();
    return res.rows[0];
}

async function buscarUsuarioNome(nome) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM usuario WHERE nome=$1', [nome]);
    await cliente.end();
    return res.rows[0];
}

async function atualizarUsuario(matricula, usuario) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('UPDATE usuario SET nome=$1, telefone=$2 WHERE matricula=$3 RETURNING *', [
        usuario.nome,
        usuario.telefone,
        matricula
    ]);
    await cliente.end();
    return res.rows[0]
}

async function deletarUsuario(matricula) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('DELETE FROM usuario WHERE matricula=$1 RETURNING *', [matricula]);
    await cliente.end();
    return res.rows[0];
}
// async function devolucaoLivro(matricula) {
//     const cliente = new Client(conexao)
//     await cliente.connect();
//     const res = await cliente.query('UPDATE usuario SET qtd_livros=$1 WHERE matricula=$2 RETURNING *', [
//         -1,
//         matricula
//     ])
//     await cliente.end();
//     return res.rows[0]; 
// }
async function retiradaLivro(valor, matricula) {
    const cliente = new Client(conexao)
    await cliente.connect();
    const res = await cliente.query('UPDATE usuario SET qtd_livros=$1 WHERE matricula=$2 RETURNING *', [
        valor,
        matricula
    ])
    await cliente.end();
    return res.rows[0]; 
}

module.exports ={
    insereUsuario,
    listarUsuarios,
    buscarUsuarioMatricula,
    buscarUsuarioNome,
    atualizarUsuario,
    deletarUsuario,
    retiradaLivro
}