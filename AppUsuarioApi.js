const express = require('express')
const usuarioNegocio = require('./negocio/usuarioNegocio')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  LISTAR USUARIOS CADASTRADOS
app.get('/usuarios', async (req, res) => {
    try {
        let usuario = await usuarioNegocio.listarUsuarios(req)
        res.json(usuario)
    } catch (err) {
        res.status(500).json({ Erro: "Erro na Aplicacao" });
    }

})

// BUSCAR USUARIO POR ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        let usuario = await usuarioNegocio.buscarUsuarioMatricula(req.params.id)
        res.send(usuario)
    }
    catch (err) { res.status(404).json({ Erro: err.mensagem }) }
})

// BUSCAR USUARIO POR NOME
app.get('/usuarios/nome/:nome', async (req, res) => {
    const nome = req.params.nome
    try {
        const nomeUsusario = await usuarioNegocio.buscarUsuarioNome(nome)
        res.json(nomeUsusario)
    } catch (err) { res.status(404).json({ Erro: err.mensagem }) }
})

// INSERIR USUARIO
app.post('/usuarios', async (req, res) => {
    try {
        let usuario = await usuarioNegocio.insereUsuario(req.body)
        res.status(201).json(usuario)//insire SEMPRE precisa retornar o code 201
    } catch (err) {
        if (err) {
            res.status(400).json({ Erro: err.mensagem })
        } else {
            console.log(err);
            res.status(500).json({ Erro: "Erro na Aplicacao" });
        }
    }

})

// ATUALIZAR USUARIO 
app.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    let usuario = req.body;

    try{
        const usuarioAtualizado = await usuarioNegocio.atualizarUsuario(id, usuario);
        res.json(usuarioAtualizado);
    }
    catch(err){
        if(err && err.id) {
            res.status(err.id).json({Erro: err.mensagem})
        }
        else {
            console.log(err);
            res.status(500).json({Erro:"Erro na Aplicacao"});
        }        
    }
})

//DELETAR USUARIO
app.delete('/usuarios/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const usuarioDeletado = await usuarioNegocio.deletarUsuario(id);
        res.status(200).json(usuarioDeletado);//deletar SEMPRE precisa retornar o code 200
    }
    catch (err) {
        if (err) {
            res.status(404).json({ Erro: err.mensagem })
        }
        else {
            console.log(err);
            res.status(500).json({ Erro: "Erro na Aplicacao" });
        }
    }//deletar SEMPRE precisa retornar o code 200
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})