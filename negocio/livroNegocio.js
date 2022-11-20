const { validacaoLivro } = require('./validacao')
const livroPersistence = require('../persistence/livroPersistence')

async function insereLivro(livro) {
    if (validacaoLivro(livro)) {
        const livroInserido = await livroPersistence.insereLivro(livro);
        return livroInserido;
    }
    else {
        throw { id: 400, mensagem: "FALTA PARAMETROS" }
    }
}

async function consultaLivro(nome) {
    const livro = await livroPersistence.buscarLivroNome(nome)
    return livroPersistence.buscarLivroNome;
}

async function listarLivros() {
    return await livroPersistence.listarLivros();
}

async function buscarLivroId(id) {
    const livro = await livroPersistence.buscarLivroId(id);
    if (!livro) {
        throw { id: 404, mensagem: `Livro ${id} nao encontrado` };
    }
    return livro;
}

async function buscarLivroNome(nome) {
    if (!nome) {
        throw { id: 400, mensagem: "Falta parametro nome" };
    }
    return await livroPersistence.buscarLivroNome(nome);
}

async function atualizarLivro(id, livro) {
    if (validacaoLivro(livro)) {
        const livroAtualizar = await buscarLivroId(id);
        if (livroAtualizar)
            return await livroPersistence.atualizarLivro(id, livro);
    }
    else {
        throw { id: 400, mensagem: "ALGUM PARAMETRO INVALIDO ...ARRUMA ISSO DEV..." };
    }
}

async function deletarLivro(id) {
    const livroDeletar = await buscarLivroId(id);
    if (livroDeletar)
        return await livroPersistence.deletarLivro(id);
}

module.exports = {
    insereLivro,
    listarLivros,
    buscarLivroId,
    buscarLivroNome,
    atualizarLivro,
    deletarLivro,
    consultaLivro
}