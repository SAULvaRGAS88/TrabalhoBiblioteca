const { validarUsuario } = require('./validacao')
const usuarioPersistence = require('../persistence/usuarioPersistence')


async function insereUsuario(usuario) {
    if (validarUsuario(usuario)) {
        const usuarioInserido = await usuarioPersistence.insereUsuario(usuario);
        return usuarioInserido;
    }
    else {
        throw { id: 400, mensagem: "FALTA PARAMETROS PARA INSERIR USUARIO" }
    }
}

async function listarUsuarios() {
    return await usuarioPersistence.listarUsuarios();
}

async function buscarUsuarioMatricula(matricula) {
    const usuario = await usuarioPersistence.buscarUsuarioMatricula(matricula);
    if (!usuario) {
    throw { matricula: 404, mensagem: `MATRICULA ${matricula} NÃO ENCONTRADA` };
    }
    return usuario;
}

async function buscarUsuarioNome(nome) {
    const nomeUser = await usuarioPersistence.buscarUsuarioNome(nome)
    if (!nomeUser) {
    throw { id: 404, mensagem: `USUARIO ${nome} NÃO ENCONTRADO` };
    }
    return nomeUser;
}

async function atualizarUsuario(matricula, usuario) {
    if (validarUsuario(usuario)) {
        const usuarioAtualizar = await usuarioPersistence.buscarUsuarioMatricula(matricula);
        if (usuarioAtualizar)
            return await usuarioPersistence.atualizarUsuario(matricula, usuario);
    }
    else {
        throw { id: 404, mensagem: "ALGUM PARAMETRO INVALIDO, ARRUMA ISSO DEV..." };
    }
}

async function deletarUsuario(matricula) {
    const usuarioDeletar = await usuarioPersistence.buscarUsuarioMatricula(matricula);
    if (usuarioDeletar){
        return await usuarioPersistence.deletarUsuario(matricula);
    }else {
        throw { id: 404, mensagem: `USUARIO ${matricula} NÃO ENCONTRADO`  };
    }
        
}

async function retiradaLivro(matricula) {
    const localizaUsuario = await usuarioPersistence.buscarUsuarioMatricula(matricula)
    if (localizaUsuario) {
        if (localizaUsuario['qtd_livros'] < 3) {
            const total = localizaUsuario['qtd_livros'] += 1
            const atualizaQtd = await usuarioPersistence.retiradaLivro(total, matricula)
            return atualizaQtd
        }
        else {
            throw { id: 400, mensagem: 'Voçê adingiu a quantidade maxima de locação' }
        }
    }
    else {
        throw { id: 404, mensagem: 'Usuario não encontrado' }
    }
}

module.exports = {
    insereUsuario,
    listarUsuarios,
    buscarUsuarioMatricula,
    buscarUsuarioNome,
    atualizarUsuario,
    deletarUsuario,
    retiradaLivro
}