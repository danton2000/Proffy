//importando o banco
const DataBase = require('./db')

const createProffy = require('./createProffy')
//continuação do código
DataBase.then(async (db) => {

    //Inserir dados
    proffyValue = {
        //vai receber um objeto
        name: "Makunouchi Ippo",
        avatar: "https://avatars1.githubusercontent.com/u/51916815?s=460&u=e3a88b5d6228eeb694f4ca41a5c0447946a183f4&v=4",
        whatsapp: "5198426027",
        bio: "Boxeador"
    }

    classValue = {
        subject: "Química",
        cost: "20"
        //proffy_id virá do banco de dados
    }

    classScheduleValues = [//pode ter mais de um, tem que agrupar os dados num array, cada posição de array é um objeto
        //class_id virá pelo banco de dados após inserir a classe
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //precisa aguardar
    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar os dados inseridos
    //todos os proffys
    //preciso receber esses proffys
    const selectProffys = await db.all("SELECT * FROM proffys")//execute todos
    // console.log(selectProffys)

    //consultar as classes de um determinado professor
    //e trazer junto os dados do professor
    //UNIR DUAS TABELAS, tudo de classe, e tudo de proffys
    const selectClasesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (
            classes.proffy_id = proffys.id
        )
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectClasesAndProffys)

    // o horario que a pessoa trabalha, por exemplo, é das 8h - 18j
    // o horario do time_from (8h) precisa ser menor ou ifual ao horário solicitado
    // o time_time precisa ser acima
    //horario tem que ser maior ou igual time_from e menor a time_to
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)

    console.log(selectClassesSchedules)
})