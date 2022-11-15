function validacaoLivro(livro) {
    return livro && livro.nome && livro.autor && livro.editora && livro.ano &&
        typeof livro.nome == 'string' &&
        typeof livro.autor == 'string' &&
        typeof livro.editora == 'string' &&
        typeof livro.ano == 'number'
}

function validarAutor(autor) {
    return autor && autor.nome && autor.pais_origem &&
        typeof autor.nome == 'string' &&
        typeof autor.pais_origem == 'string'
}
function validarCliente(cliente) {
    return cliente && cliente.matricula && cliente.nome && cliente.telefone &&
        typeof cliente.matricula == 'number' &&
        typeof cliente.nome == 'string' &&
        typeof cliente.telefone == 'string'
}

module.exports = {
    validacaoLivro,
    validarAutor, 
    validarCliente
}