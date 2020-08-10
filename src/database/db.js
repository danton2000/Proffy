//importa o módulo 
const Database = require('sqlite-async')

function execute(db){
    // console.log('cheguei aqui')
    // console.log(db)
    // esse bd é um objeto

    //criar as tabelas do banco de dados
    //executa os comandos do sql
     return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS class_schedules (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTERGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

//pegar Database e abrir o banco, onde está o banco de dados
//voce vai abrir esse arquivo(criar) então(executa)
//exporta esse banco de dados
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)