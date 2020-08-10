//PROCURAR O BOTÃO
document.querySelector("#add-time")
//QUANDO CLICAR NO BOTAO,clicar é um evento, usuário faz eventos na página
.addEventListener('click', cloneField)
// Ouvidor de Eventos, qual o tipo de evento, o que eu vou fazer quando clicar(eu que tenho que criar) 

//EXECUTAR UMA AÇÃO
function cloneField(){
    // console.log("Cheguei aqui")
    //vai colocar tudo que estiver no console.log(), no console dos navegadores
    //DUPLICAR OS CAMPOS,que campos? Pegar os campos
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)//colocando true ele pega todas as tags filhas
    //node = tags html, cloneNode = duplicar html.

    //pegar os campos, que campos?, procurar todos os input, e coloca nesse fields
    const fields = newFieldContainer.querySelectorAll('input')

    //para cada campo, limpar
    fields.forEach(function(field){
        //pegar um field do momento e limpa
        field.value = "";
    })

    //COLOCAR NA PÁGINA, onde colocar?
    document.querySelector("#schedule-items").appendChild(newFieldContainer)//colocar os campos ai

}
