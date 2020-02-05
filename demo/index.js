//VARIAVEL QUE CONTEM TODAS AS FUNÇÕES DE UTILS
const methodUtils = utils();
//VARIAVEL PARA ARMAZENAR FORMULATIOS
const forms = {};

$(document).ready(function(){
    //DEFININDO OS INPUTS DO FORMULARIO
    //name = Nome da tag
    //type = tipo de tag (input, select...)
    forms['formulario'] = [
            {name:'nome',type:'input'},
            {name:'email',type:'input'},
            {name:'telefone',type:'input'},
            {name:'cidade',type:'input'},
            {name:'uf',type:'select'},
            {name:'nascimento',type:'input'},
            {name:'sexo',type:'radio'},
            {name:'notificacao',type:'checkbox'},
            {name:'alertas',type:'checkbox'}
        ]
    //DEFININDO O SELECT PICKER 
    $('select[name="uf"]').selectpicker();

    //AÇÕES DO BUTTON MONTAR
    $('button[name="montar"]').click(function(){
        //METODO QUE MONTA OBJETO DOS INPUT`S DO FORMULARIO, PARAMETROS(ID_DO_FORMULARIO, ESPECIFICAÇAO_DO_FOMULARIO)
        let obj = methodUtils.getObjectForm('form',forms.formulario);
        // 
        $('#resultado').empty();         
        let itens = '<li>Nome: '+obj.nome.value+'</li>'+
                    '<li>Email: '+obj.email.value+'</li>'+
                    '<li>Telefone: '+obj.telefone.value+'</li>'+
                    '<li>Cidade: '+obj.cidade.value+'</li>'+
                    '<li>Estado: '+obj.uf.value+'</li>'+
                    '<li>Data de Nascimento: '+obj.nascimento.value+'</li>'+
                    '<li>Sexo: '+obj.sexo.value+'</li>'+
                    '<li>Notificação: '+obj.notificacao.value+'</li>'+
                    '<li>Alertas: '+obj.alertas.value+'</li>';
        
        $('#resultado').append(itens);
    })
    //AÇÃO DO BUTTON LIMPAR
    $('button[name="limpar"]').click(function(){
        $('#resultado').empty();
        //true => informa que formulario utiliza selectpicker, caso não use basta remover ou colocar false
        methodUtils.resetForm('form',true);
        
    })

})