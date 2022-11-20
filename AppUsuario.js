const usuarioNegocio = require('./negocio/usuarioNegocio')

async function main() {
    //ADICIONANDO CLIENTE

    // try {
    //     const insereUsuario01 = await usuarioNegocio.insereUsuario({
    //         nome: 'Saul Vargas Costa',
    //         telefone: '(51) 985027412',
    //     })
    //     console.log('USUARIO 01 INSERIDO', insereUsuario01);
    // } catch (err) {
    //     console.log(err);
    // }

    // try {
    //     const insereUsuario02 = await usuarioNegocio.insereUsuario({
    //         nome: 'João da Perna Fina',
    //         telefone: '(51) 985050148',
    //     })
    //     console.log('USUARIO 02 INSERIDO', insereUsuario02);
    // } catch (err) {
    //     console.log(err);
    // }

    // LISTANDO TODOS USUARIOs
    const list = await usuarioNegocio.listarUsuarios()
    console.log('>>>LISTE DE USUARIO CADASTRADO(s)', list);

    // BUSCANDO USUARIO POR MATRICULA
    try {
        const usuario = await usuarioNegocio.buscarUsuarioMatricula(1)
        console.log('>>> USUARIO 1 PESQUISADO POR ID', usuario);
    } catch (err) {
        console.log('ERRO', err);
    }

    // BUSCANDO USUARIO POR NOME
    try {
        const usuario = await usuarioNegocio.buscarUsuarioNome('Saul Vargas Costa');
        console.log(">>> USUARIO 1 PESQUISADO POR NOME", usuario);
    } catch (err) {
        console.log("Erro", err);
    }

    // CASO DE SUCESSO EM ATULIAZAR USUARIO
    try {
        const usuarioAtualizado = await usuarioNegocio.atualizarUsuario(1, {
            nome: 'Saul Vargas Costa',
            telefone: '(51) 999999999',
        });
        console.log('>>>USUARIO ATUALIZADO PARA', usuarioAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

      // //CASO DE INSUCESSO: PARAMETRO NUMBER EM STRING 
      try {
        const usuarioAtualizado = await usuarioNegocio.atualizarUsuario(1, {
            nome: 'Saul Vargas Costa',
            telefone: 51999999999,
        });
        console.log('USUARIO ATUALIZADO PARA', usuarioAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

    // //CASO DE INSUCESSO: MATRICULA INEXISTENTE
    try {
        const usuarioAtualizado = await usuarioNegocio.atualizarUsuario(777, {
            nome: 'Saul Vargas Costa',
            telefone: '(51) 999999999'
        });
        console.log('USUARIO ATUALIZADO PARA', usuarioAtualizado);
    }
    catch (err) {
        console.log("Erro", err);
    }

     // //CASO DE SUCESSO - DELETAR USUARIO
     try {
        //MATRICULA VALIDO
        const usuarioDeletado = await usuarioNegocio.deletarUsuario(1);
        console.log(">>> USUARIO DELETADO COM SUCESSO ", usuarioDeletado);
    } catch (err) {
        console.log("Erro", err);
    }
    // //CASO DE INSUCESSO: ID INEXISTENTE
    try {
        //TRAZER MATRICULA INVALIDA
        const usuarioDeletado = await usuarioNegocio.deletarUsuario(200);
        console.log("USUARIO DELETADO", usuarioDeletado);
    } catch (err) {
        console.log("Erro", err);
    }
}

main()