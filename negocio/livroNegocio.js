const {validacaoLivro} = require('./validacao')
const livroPersistence = require('../persistence/livroPersistence')

async function inserireLivro(livro) {
    if(validacaoLivro(livro)){
        const livroInserido = await livroPersistence.inserireLivro(livro);
        return livroInserido;
    }
    else {
        throw { id: 400, mensagem: "Falta parametros"};
    }
}

async function listarLivros() {
    return await livroPersistence.listarLivros();
}

module.exports ={
    inserireLivro,
    listarLivros
}