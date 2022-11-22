const livroNegocio = require('./negocio/livroNegocio')

async function main() {
    //ADICIONANDO LIVROS
    // try {
    //     const insereLivro01 = await livroNegocio.insereLivro({
    //         nome: 'O pequeno príncipe',
    //         autor: 'Antoine de Saint-Exupéry',
    //         editora: 'Editora do  Brasil',
    //         ano: 1943
    //     })
    //     console.log('Livro 01 inserido', insereLivro01);
    // } catch (err) {
    //     console.log(err);
    // }

    // try {
    //     const insereLivro02 = await livroNegocio.insereLivro({
    //         nome: 'O Menino Maluquinho',
    //         autor: 'Ziraldo Alves Pinto',
    //         editora: 'Melhoramentos',
    //         ano: 1980
    //     })
    //     console.log('Livro 02 inserido', insereLivro02);
    // } catch (err) {
    //     console.log(err);
    // }

    // LISTANDO TODOS LIVROS
    const list = await livroNegocio.listarLivros()
    console.log('Lista de livro(s)', list);

    // BUSCANDO LIVRO POR ID
    try {
        const livro = await livroNegocio.buscarLivroId(205)
        console.log('LIVRO 2 PESQUISADO POR ID', livro);
    } catch (err) {
        console.log('ERRO', err);
    }
    // BUSCANDO LIVRO POR NOME
    try {
        const livro = await livroNegocio.buscarLivroNome('O Menino Maluquinho');
        console.log("Livro 2 PESQUISADO POR NOME", livro);
    } catch (err) {
        console.log("Erro", err);
    }

    // // CASO DE SUCESSO EM ATULIAZAR LIVRO
    try {
        const livroAtualizado = await livroNegocio.atualizarLivro(205, {
            nome: 'O Menino Maluquinho',
            autor: 'Ziraldo Alves Pinto',
            editora: 'Melhoramentos',
            ano: 2022
        });
        console.log('LIVRO ATUALIZADO PARA', livroAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE INSUCESSO: PARAMETRO ANO E STRING 
    try {
        const livroAtualizado = await livroNegocio.atualizarLivro(141, {
            nome: 'O Menino Maluquinho',
            autor: 'Ziraldo Alves Pinto',
            editora: 'Melhoramentos',
            ano: '2022'
        });
        console.log('LIVRO ATUALIZADO PARA', livroAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE INSUCESSO: ID INEXISTENTE
    try {
        const livroAtualizado = await livroNegocio.atualizarLivro(777, {
            nome: 'O Menino Maluquinho', autor: 'Ziraldo Alves Pinto',
            editora: 'Melhoramentos',
            ano: 2022
        });
        console.log('LIVRO ATUALIZADO PARA', livroAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE SUCESSO - DELETAR LIVRO
    try {
        //ID VALIDO
        const livroDeletado = await livroNegocio.deletarLivro(666);
        console.log("LIVRO DELETADO COM SUCESSO >>>", livroDeletado);
    } catch (err) {
        console.log("Erro", err);
    }
    // //CASO DE INSUCESSO: ID INEXISTENTE
    try {
        //TRAZER ID INVALIDO
        const livroDeletado = await livroNegocio.deletarLivro(200);
        console.log("Livro deletado", livroDeletado);
    } catch (err) {
        console.log("Erro", err);
    }

    // //TRAZER LIVROS DISPONIVEIS
    // try {
    //     const livroDisponivel = await livroNegocio.consultaLivroDisponivel('O Menino Maluquinho');
    //     console.log(">>>LIVROS DISPONIVEIS", livroDisponivel);
    // } catch (err){
    //     console.log("ERRO", err );
    // }
}

main()
