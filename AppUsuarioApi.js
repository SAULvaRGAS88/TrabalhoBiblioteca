const express = require('express')
const usuarioNegocio = require('./negocio/usuarioNegocio')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  LISTAR USUARIOS CADASTRADOS
app.get('/usuarios', async (req, res) => {
    let usuario = await usuarioNegocio.listarUsuarios(req)
    res.json(usuario)
})

// BUSCAR USUARIO POR ID
app.get('/usuarios/:id', async (req, res) => {
    let usuario = await usuarioNegocio.buscarUsuarioMatricula(req.params.id)
    res.send(usuario)
})

// INSERIR AUTOR
app.post('/usuarios', async (req, res) => {
    try {
        let usuario = await usuarioNegocio.insereUsuario(req.body)
        res.status(201).json(usuario)//insire SEMPRE precisa retornar o code 201
    } catch (error) {
        res.status(500).json
    }

})

// ATUALIZAR USUARIO 
app.put("/usuarios/:id", async (req, res) => {
    const id = req.params.id;
    let livro = req.body;

    try {
        const usuarioAtualizado = await usuarioNegocio.atualizarUsuario(id, livro);
        res.json(usuarioAtualizado);//atualizar SEMPRE precisa retornar o code 200
    }
    catch (err) {
        if (err && err.id) {
            res.status(err.id).json({ Erro: err.mensagem })
        }
        else {
            console.log(err);
            res.status(500).json({ Erro: "Erro na Aplicacao" });
        }
    }
})

//DELETAR USUARIO
app.delete('/usuarios/:id', async(req, res) => {
    const id = req.params.id;
    let autor = req.body;

    try {
        const usuarioDeletado = await usuarioNegocio.deletarUsuario(id, autor);
        res.status(200).json(usuarioDeletado);//deletar SEMPRE precisa retornar o code 200
    }
    catch (err) {
        if (err && err.id) {
            res.status(err.id).json({ Erro: err.mensagem })
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