const autorNegocio = require('./negocio/autorNegocio')

async function main() {

    //INSERINDO AUTORES
    // try {
    //     const insereAutor01 = await autorNegocio.insereAutor({
    //         nome: 'Antoine de Saint-Exupéry',
    //         pais_origem: 'França',
    //     })
    //     console.log('Autor 01 inserido', insereAutor01);
    // } catch (err) {
    //     console.log(err);
    // }

    // try {
    //     const insereAutor02 = await autorNegocio.insereAutor({
    //         nome: 'Ziraldo Alves Pinto',
    //         pais_origem: 'Brasil'
    //     })
    //     console.log('Autor 02 inserido', insereAutor02);
    // } catch (err){
    //     console.log(err);
    // }
   

    //LISTANDO TODOS OS AUTORES
    const list = await autorNegocio.listarAutores();
    console.log("LISTA DE AUTORES CADASTRADOS", list);

 
    console.log('<<<<<<<<<<<>>>>>>>>');


    //BUSCANDO AUTOR POR ID
    try{
        const autor = await autorNegocio.buscarAutorId(1)
        console.log('>>> AUTOR PEQUISADO POR ID', autor);
    }catch (err){
        console.log('ERRO', err);
    }

    // BUSCANDO AUTOR POR NOME
    try {
        const autor = await autorNegocio.buscarAutorNome('Ziraldo Alves Pinto');
        console.log(">>> AUTOR 2 PESQUISADO POR NOME", autor);
    } catch (err) {
        console.log("Erro", err);
    }

     // // CASO DE SUCESSO EM ATULIAZAR AUTOR
     try {
        const autorAtualizado = await autorNegocio.atualizarAutor(2, {
            nome: 'Antoine de Saint-Exupéry',
            pais_origem: 'Argentina'
        });
        console.log('>>> AUTOR 2 ATUALIZADO PARA', autorAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

     // //CASO DE INSUCESSO: PARAMETRO STRING por NUMBER 
     try {
        const autorAtualizado = await autorNegocio.atualizarAutor(1, {
            nome: 'Antoine de Saint-Exupéry',
            pais_origem: 777,
        });
        console.log('>>> AUTOR ATUALIZADO PARA', autorAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE INSUCESSO: ID INEXISTENTE
    try {
        const autorAtualizado = await autorNegocio.atualizarAutor(9999, {
            nome: 'Antoine de Saint-Exupéry',
            pais_origem: 'França',
        });
        console.log('>>> AUTOR ATUALIZADO PARA', autorAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE SUCESSO - DELETAR AUTOR
    try {
        //ID VALIDO
        const autorDeletado = await autorNegocio.deletarAutor(2);
        console.log("AUTOR DELETADO COM SUCESSO >>>", autorDeletado);
    } catch (err) {
        console.log("Erro", err);
    }
    // //CASO DE INSUCESSO: ID INEXISTENTE
    try {
        //TRAZER ID INVALIDO
        const autorDeletado = await autorNegocio.deletarAutor(200);
        console.log("AUTOR DELETADO", autorDeletado);
    } catch (err) {
        console.log("Erro", err);
    }
}

main()