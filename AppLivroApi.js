const express = require('express')
const livroNegocio = require('./negocio/livroNegocio')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//  LISTAR LIVROS CADASTRADOS
app.get('/livros', async (req, res) => {
    let livro = await livroNegocio.listarLivros(req)
    res.json(livro)
})

// BUSCAR LIVRO POR ID
app.get('/livros/:id', async (req, res) => {
    const id = req.params.id
    try {
        let livro = await livroNegocio.buscarLivroId(id)
        res.json(livro)
    }
    catch (err) {
        if (err && err.id) {
            res.status(err.id).json({ Erro: err.mensagem })
        }
        else {
            res.status(500).json({ Erro: "Erro na Aplicacao" });
        }
    }

})

// BUSCAR LIVRO POR NOME
app.get('/livros/nome/:nome', async (req, res) =>{
    const nome = req.params.nome
    try{
        const nomeLivro = await livroNegocio.buscarLivroNome(nome)
        res.json(nomeLivro)
    }catch (err){
        if (err && err.id) {
            res.status(err.id).json({ Erro: err.mensagem })
        }
        else {
            res.status(500).json({ Erro: "Erro na Aplicacao" });
        }
    }
})

// INSERIR LIVRO
app.post('/livros', async (req, res) => {
    try {
        let livro = await livroNegocio.insereLivro(req.body)
        res.status(201).json(livro)//insire SEMPRE precisa retornar o code 201
    } catch (error) {
        res.status(500).json
    }

})

// ATUALIZAR LIVRO 
app.put("/livros/:id", async (req, res) => {
    const id = req.params.id;
    let livro = req.body;

    try {
        const livroAtualizado = await livroNegocio.atualizarLivro(id, livro);
        res.json(livroAtualizado);//atualizar SEMPRE precisa retornar o code 200
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

//DELETAR LIVRO
app.delete('/livros/:id', async (req, res) => {
    const id = req.params.id;
    let livro = req.body;

    try {
        const livroDeletado = await livroNegocio.deletarLivro(id, livro);
        res.status(200).json(livroDeletado);//deletar SEMPRE precisa retornar o code 200
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