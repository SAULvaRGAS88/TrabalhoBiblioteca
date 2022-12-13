const { validarAutor } = require('./validacao')
const autorPersistence = require('../persistence/autorPersistence')

async function insereAutor(autor) {
    if (validarAutor(autor)) {
        const autorInserido = await autorPersistence.insereAutor(autor);
        return autorInserido;
    }
    else {
        throw { id: 400, mensagem: "FALTA PARAMETROS PARA INSERIR AUTOR. FAVOR VERIFICAR E TENTE NOVAMENTE" }
    }
}

async function listarAutores() {
    return await autorPersistence.listarAutores();
}

const listarAllAutores = async () =>{
    return await autorPersistence.listarAllAutores()
}

async function buscarAutorId(id) {
    const autor = await autorPersistence.buscarAutorId(id);
    if (!autor) {
        throw { id: 404, mensagem: `Autor com ID ${id} nao encontrado. Favor tentar novamente` };
    }
    return autor;
}

const buscarAutorNome =  async (nome) =>{
    const nomeAutor = await autorPersistence.buscarAutorNome(nome)
    if (!nomeAutor){
        throw{ id: 404, mensagem: `AUTOR ${nome} NÃO ENCONTRADO EM NOSSO BANCO DE DADOS. FAVOR VERIFICAR E TENTE NOVAMENTE.`}
    }
    return nomeAutor
}

async function atualizarAutor(id, autor) {
    if (validarAutor(autor)) {
        const autorAtualizar = await buscarAutorId(id);
        if (autorAtualizar)
            return await autorPersistence.atualizarAutor(id, autor);
    }
    else {
        throw { id: 400, mensagem: "ALGUM PARAMETRO INVALIDO ...ARRUMA ISSO DEV..." };
    }
}

async function deletarAutor(id) {
    const autorDeletar = await buscarAutorId(id);
    if (autorDeletar)
        return await autorPersistence.deletarAutor(id);
}



module.exports = {
    insereAutor,
    listarAutores,
    buscarAutorId,
    buscarAutorNome,
    atualizarAutor,
    deletarAutor,
    listarAllAutores
}



