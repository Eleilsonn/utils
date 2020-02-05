//VARIAVEL QUE CONTEM TODAS AS FUNÇÕES DE UTILS
const methodUtils = utils();

$(document).ready(function(){
    //DEFININDO OS ESPECIFICAÇÕES DO FORMULARIO
    //name = Nome da tag
    //type = tipo de tag (input, select...)
    let formulario = [
            {name:'nome',type:'input'},
            {name:'email',type:'input'},
            {name:'telefone',type:'input'},
            {name:'cidade',type:'input'},
            {name:'uf',type:'select'},
            {name:'nascimento',type:'date'},
            {name:'sexo',type:'radio'},
            {name:'notificacao',type:'checkbox'},
            {name:'alertas',type:'checkbox'}
        ]
    //PARAMETROS(ID_DO_FORMULARIO,ESPECIFICAÇÕES_DO_FORMULARIO)   
    methodUtils.setForm('form',formulario);
   
    //DEFININDO O SELECT PICKER 
    $('select[name="uf"]').selectpicker();

    //AÇÕES DO BUTTON MONTAR
    $('button[name="montar"]').click(function(){
        //METODO QUE MONTA OBJETO DOS INPUT`S DO FORMULARIO, PARAMETROS(ID_DO_FORMULARIO)
        let obj = methodUtils.getObjectForm('form');
        // 
        $('#resultado').empty();         
        let itens = '<li><strong>Nome:</strong> '+obj.nome.value+'</li>'+
                    '<li><strong>Email:</strong> '+obj.email.value+'</li>'+
                    '<li><strong>Telefone:</strong> '+obj.telefone.value+'</li>'+
                    '<li><strong>Cidade:</strong> '+obj.cidade.value+'</li>'+
                    '<li><strong>UF:</strong> '+obj.uf.value+' <strong>Estado:</strong> '+obj.uf.text+'</li>'+
                    '<li><strong>Data de Nascimento:</strong> '+obj.nascimento.value+'</li>'+
                    '<li><strong>Sexo:</strong> '+obj.sexo.value+'</li>'+
                    '<li><strong>Notificação:</strong> '+obj.notificacao.value+'</li>'+
                    '<li><strong>Alertas:</strong> '+obj.alertas.value+'</li>';
        
        $('#resultado').append(itens);
    })
    //AÇÃO DO BUTTON LIMPAR
    $('button[name="limpar"]').click(function(){
        $('#resultado').empty();
        //true => informa que formulario utiliza selectpicker, caso não use basta remover ou colocar false
        methodUtils.resetForm('form',true);
        
    })
    //AÇÃO PARA BUTTON PREENCHER
    $('button[name="preencher"]').click(function(){
        //OBJETO PARA PREENCHER
        let obj = {
            nome_usuario:"José Francisco",
            email:"email@email.com",
            telefone_user:"99 9 9999-9999",
            cidade:"Teresina",
            uf:'PI',
            data_de_nascimento:'2012/12/12 T09090',
            sexo:'masculino',
            notificacao:false,
            receber_alertas:true
        }//FIM DO OBJETO

        //ESPECIFICAÇÕES NECESSÁRIA PARA PREENCHER COMBO nome das variaveis(em especification) = name do input, e valor da variavel = nome da variavel do obj
        let especification = {
            nome:'nome_usuario',
            email:'email',
            telefone:'telefone_user',
            cidade:'cidade',
            uf:'uf',
            nascimento:'data_de_nascimento',
            sexo:'sexo',
            notificacao:'notificacao',
            alertas:'receber_alertas'
        }
        //METODO PREENCHER FORMULARIO, PARAMETROS(ID_DO_FORMULARIO, ESPECIFICAÇOES_DO_OBJETO, OBJETO, SELECTPICKER)
        methodUtils.setValuesInInputs('form',especification,obj,true);
    })

})