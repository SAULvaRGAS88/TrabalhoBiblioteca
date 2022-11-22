function validacaoLivro(livro) {
    return livro && livro.nome && livro.autor && livro.editora && livro.ano && livro.status &&
        typeof livro.nome == 'string' &&
        typeof livro.autor == 'string' &&
        typeof livro.editora == 'string' &&
        typeof livro.ano == 'number' &&
        typeof livro.status == 'string'
}

function validarAutor(autor) {
    return autor && autor.nome && autor.pais_origem &&
        typeof autor.nome == 'string' &&
        typeof autor.pais_origem == 'string'
}
function validarUsuario(usuario) {
    return usuario && usuario.nome && usuario.telefone && usuario.qtd_livros &&
        typeof usuario.nome == 'string' &&
        typeof usuario.telefone == 'string' &&
        typeof usuario.qtd_livros == 'number'
}

module.exports = {
    validacaoLivro,
    validarAutor, 
    validarUsuario
}