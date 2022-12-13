const { validacaoLivro } = require('./validacao')
const livroPersistence = require('../persistence/livroPersistence')

async function insereLivro(livro) {
    if (validacaoLivro(livro)) {
        const livroInserido = await livroPersistence.insereLivro(livro);
        return livroInserido;
    }
    else {
        throw { id: 400, mensagem: "FALTA PARAMETROS PARA INSERIR LIVRO. FAVOR VERIFICAR E TENTE NOVAMENTE" }
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
        throw { id: 404, mensagem: `Livro ID Número ${id}, nao encontrado. Pesquise po ID valido` };
    }
    return livro;
}

async function buscarLivroNome(nome) {
    const nomeLivro = await livroPersistence.buscarLivroNome(nome)
    if (!nomeLivro) {
        throw { id: 404, mensagem: `LIVRO ${nome} NÃO ENCONTRADO EM NOSSO BANCO DE DADOS. FAVOR VERIFICAR E TENTE NOVAMENTE.` };
    }
    return nomeLivro
}

async function atualizarLivro(id, livro) {
    if (validacaoLivro(livro)) {
        const livroAtualizar = await buscarLivroId(id);
        if (livroAtualizar)
            return await livroPersistence.atualizarLivro(id, livro);
    }
    else {
        throw { id: 400, mensagem: "ALGUM PARAMETRO INVALIDO ...VERIFIQUE DADOS E TENTE NOVAMENTE..." };
    }
}

async function deletarLivro(id) {
    const livroDeletar = await buscarLivroId(id);
    if (livroDeletar)
        return await livroPersistence.deletarLivro(id);
    else {
        throw { id: 404, mensagem: `Livro ID Número ${id}, nao encontrado. Pesquise po ID valido` };
    }    
}

async function consultaLivroDisponivel(status) {
    if (!status){
        throw { id: 400, mensagem: "ALGUM PARAMETRO INVALIDO ...VERIFIQUE DADOS E TENTE NOVAMENTE..." };
    }
    return await livroPersistence.consultaLivroDisponivel(status); 
}

async function consultaLivroLocado(status) {
    if(!status){
        throw { id: 400, mensagem: "ALGUM PARAMETRO INVALIDO ...VERIFIQUE DADOS E TENTE NOVAMENTE..." };
    }
    return await livroPersistence.consultaLivroLocado(status);
}


module.exports = {
    insereLivro,
    listarLivros,
    buscarLivroId,
    buscarLivroNome,
    atualizarLivro,
    deletarLivro,
    consultaLivro,
    consultaLivroDisponivel,
    consultaLivroLocado
}