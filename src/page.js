//puxar o banco de dados pra cá
const Database = require('./database/db')

const { subjects, weekdays, getSubject, convertHoursToMinutes } = require('./utils/format')//pegando o objeto, retirando e colocando com os mesmos nomes

//funcionalidades
function pageLanding(req, res) {
    return res.render("index.html")
}

//render vai renderizar os arquivos juntos com a ferramenta nunjucks
async function pageStudy(req, res) {
    //informações que eu estou enviando a mais
    const filters = req.query//contem todas as informações depois do "?"

    //verificando filters
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render("study.html", {
            // proffys,//1 objeto que dentro pode ter varios objetos
            filters,
            subjects,
            weekdays
            //enviando os objetos para o tamplate, para o nunjuck fazer a logica com eles
        })
    }

    //CONVERTER HORAS EM MINUTOS
    const timeToMinutes = convertHoursToMinutes(filters.time)

    //criando a busca dos professores
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (
            classes.proffy_id = proffys.id
        )
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_to > ${timeToMinutes}
        )
        AND classes.subject = '${filters.subject}'
    `
    //caso haja erro na hora da consulta do banco de dados
    try {
        //conexão com o banco
        const db = await Database
        const proffys = await db.all(query)

        //convertando o subject de int para text
        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

        //passando os dados para a pagina
        return res.render('study.html', {
            proffys,
            subjects,
            filters,
            weekdays
        })

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    //senão, não adicionar e mostrar a mesma pagina
    return res.render("give-classes.html", {
        subjects,
        weekdays
    })
}

async function saveClasses(req, res) {
    //usando o insert do banco de dados
    const createProffy = require('./database/createProffy')
    //recebe os dados escondido da url
    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    //percorrendo o array, index = index do momento
    const classScheduleValues = req.body.weekday.map((weekday, index) => {

        return {
            //retornando o objeto, e convertado as horas
            weekday,
            time_from: convertHoursToMinutes(req.body.time_from[index]),
            time_to: convertHoursToMinutes(req.body.time_to[index])
        }
    })

    try {

        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })//vai inserir os dados no bd

        //pegando esses dados e levando para study tambem, e já fazendo o filtro
        let queryString = "?subject=" + req.body.subject
        queryString += "&weekday=" + req.body.weekday[0]
        queryString += "&time=" + req.body.time_from[0]

        return res.redirect("/study" + queryString)//redirecionando para o arquivo study, com um filtro

    } catch (error) {

        console.log(error)

    }

}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}