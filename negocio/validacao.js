function validacaoLivro(livro) {
    return livro && livro.nome && livro.autor && livro.editora && livro.ano &&
        typeof livro.nome == 'string' &&
        typeof livro.autor == 'string' &&
        typeof livro.editora == 'string' &&
        typeof livro.ano == 'number'
}

function validarAutor(autor) {
    return autor && autor.nome && autor.paisOrigem &&
        typeof autor.nome == 'string' &&
        typeof autor.paisOrigem == 'string'
}
function validarCliente(cliente) {
    return cliente && cliente.matricula && cliente.nome && cliente.telefone &&
        typeof cliente.matricula == 'number' &&
        typeof cliente.nome == 'string' &&
        typeof cliente.telefone == 'number'
}

module.exports = {
    validacaoLivro,
    validarAutor, 
    validarCliente
}