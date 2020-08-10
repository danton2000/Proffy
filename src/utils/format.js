//dados
const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]
//FUNCIONALIDADES
//pegando as materias em formato numerico e convertando para string
function getSubject(subjectNumber){
    //esta me retorando um numero que vou pegar da page, e fazendo -1, para pegar na posição correta do array
    const arrayPosition = +subjectNumber  - 1
    return subjects[arrayPosition]
}

//converte as horas em minutos
function convertHoursToMinutes(time){
    //recebendo os valores, criando duas varias, hours, minutes
    const [hours, minutes] = time.split(":")
    return Number((hours * 60) + minutes)
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    convertHoursToMinutes
}
