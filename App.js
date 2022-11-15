const livroNegocio = require('./negocio/livroNegocio')

async function main() {
    
        const list = await livroNegocio.listarLivros()
        console.log('Lista de livro(s)', list);


}

main()