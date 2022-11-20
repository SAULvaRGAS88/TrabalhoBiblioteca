const { validarAutor } = require('./validacao')
const autorPersistence = require('../persistence/autorPersistence')

async function insereAutor(autor) {
    if (validarAutor(autor)) {
        const autorInserido = await autorPersistence.insereAutor(autor);
        return autorInserido;
    }
    else {
        throw { id: 400, mensagem: "FALTA PARAMETROS" }
    }
}

async function listarAutores() {
    return await autorPersistence.listarAutores();
}

async function buscarAutorId(id) {
    const autor = await autorPersistence.buscarAutorId(id);
    if (!autor) {
        throw { id: 404, mensagem: `Autor ${id} nao encontrado` };
    }
    return autor;
}

async function buscarAutorNome(nome) {
    if (!nome) {
        throw { id: 400, mensagem: "Falta parametro nome" };
    }
    return await autorPersistence.buscarAutorNome(nome);
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
    deletarAutor
}



