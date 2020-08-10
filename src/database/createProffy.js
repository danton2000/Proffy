//INSERE OS DADOS
// QUANDO EU RODA ELA, ELA VAI ENTRAR AQUI PARA SER EXECUTADA MANDANDO O DB, VAI AGUARDAR, DEPOIS VAI COLOCAR AS COISAS NO BANCO DE DADOS, TERMINO VAI COLOCAR NA VAR QUAL FOI O PROFFY,(pegando o id)
//exportando o arquivo, e a função
module.exports = async function(db, {proffyValue, classValue, classScheduleValues}){
    //estou recebendo o banco de dados, e os valores
    //inserir dados na tabela proffys
    //vou tentar, se conseguir então
    //await = esperar, não precisa do then, precisa estar async na function para funcionar
    const insertedProffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)
    //preciso pegar o id
    const proffy_id = insertedProffy.lastID
    
    //Inserir dados da tabela classes
    const insertedClasses = await db.run(`
        INSERT INTO classes (
            subject,
            cost,
            proffy_id
        ) VALUES (
            "${classValue.subject}",
            "${classValue.cost}",
            "${proffy_id}"
        );
    `)
    
    //preciso pegar o id
    const class_id = insertedClasses.lastID

    //inserir dados da tabela class_schedule
   //preciso fazer um laço de repetição para navegar entre os arrays com os dados
   //map = mapear array
   /*
    () => {
       função sem nome, arrow function
    }
   */
    //foreach não retorna os dados
    //map consegue agrupar um novo array, vai retornar, dai consigo manipular os dados
   const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
   })

   //aqui vou executar todos os db.runs() das class_schudules
   await Promise.all(insertedAllClassesScheduleValues)//consegue executar um array de muitas promessas
}