const express = require('express')
const autorNegocio = require('./negocio/autorNegocio')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  LISTAR AUTORES CADASTRADOS
app.get('/autores', async (req, res) => {
    let autor = await autorNegocio.listarAutores(req)
    res.json(autor)
})

// BUSCAR AUTOR POR ID
app.get('/autores/:id', async (req, res) => {
    let autor = await autorNegocio.buscarAutorId(req.params.id)
    res.send(autor)
})

// INSERIR AUTOR
app.post('/autores', async (req, res) => {
    try {
        let autor = await autorNegocio.insereAutor(req.body)
        res.status(201).json(autor)//insire SEMPRE precisa retornar o code 201
    } catch (error) {
        res.status(500).json
    }

})

// ATUALIZAR AUTOR 
app.put("/autores/:id", async (req, res) => {
    const id = req.params.id;
    let livro = req.body;

    try {
        const autorAtualizado = await autorNegocio.atualizarAutor(id, livro);
        res.json(autorAtualizado);//deletar SEMPRE precisa retornar o code 200
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

//DELETAR AUTOR
app.delete('/autores/:id', async(req, res) => {
    const id = req.params.id;
    let autor = req.body;

    try {
        const autorDeletado = await autorNegocio.deletarAutor(id, autor);
        res.status(200).json(autorDeletado);//deletar SEMPRE precisa retornar o code 200
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