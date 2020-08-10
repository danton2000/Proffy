//servidor express

//SERVIDOR
const express = require('express')
//vai retornar o express
//express é uma função
const server = express()
//retorando a page.js
const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
} = require('./page')

//importanto o nunjucks
const nunjucks = require('nunjucks')

//configurar nunjucks, pasta onde está meus html, enviar um obj com as informações
nunjucks.configure('src/views', {
    express: server,//obj
    noCache: true,//sem cache
})

//INICIO E CONFIGURAÇÃO DO SERIVOR
server
    //receber os dados do req.body, fazendo isso posso receber os dados do req.body
    .use(express.urlencoded({extended: true}))
    //configurar arquivos estáticos(css, scripts, images)
    //é uma configuraão do servidor
    //arquivos estaticos são as imagens
    //quero que arrume a pasta public
    .use(express.static("public"))
    //ROTAS
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    .post("/save-classes", saveClasses)
    .listen(5500)
//listen() ouvir porta
