const express = require('express')
const livroNegocio = require('./negocio/livroNegocio')
const app = express()
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/livros', async (req, res) => {
    let livro = await livroNegocio.listarLivros(req)
    res.json(livro)
})
app.get('/livros/:id', async (req, res) => {
    let livro = await livroNegocio.buscarLivroId(req.params.id)
    res.send(livro)
})
app.post('/livros', async (req, res) => {
    try {
        let livro = await livroNegocio.insereLivro(req.body)
        res.status(201).json(livro)//insire SEMPRE precisa retornar o code 201
    } catch (error) {
        res.status(500).json
    }

})
app.put('/livros/:id', async(req, res) => {
    try{
       let livro = await livroNegocio.atualizarLivro(req.body) 
       res.status(200).json("Livro atualizado", livro)//atualizar SEMPRE precisa retornar o code 200 
    } catch(error){
        res.status(500).json
    }
    
})
app.delete('/livros/:id', (req, res) => {
    res.send(`Deletar livros` + req.params.id)//deletar SEMPRE precisa retornar o code 200
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})