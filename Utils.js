'use-strict'
function formatTypeDate(date){
    date = date.split('T');
    date = date[0];   
    
    date = date.split('-');
    if(date.length > 2){
        if(date[0].length > 2){
            date = date[0]+'-'+date[1]+'-'+date[2];
        }else{
            date = date[2]+'-'+date[1]+'-'+date[0];           
        }
    }else{
        date= date[0];
    }
    
    date = date.split('/');    
    if(date.length > 1){
        if(date[0].length > 2){
            date = date[0]+'-'+date[1]+'-'+date[2];
        }else{
            date = date[2]+'-'+date[1]+'-'+date[0];
        }
    }else{
        date = date[0];
    }  
    
    return date.replace(/\ /g,'');
}
const utils = () =>{
    var forms = {}
    const setForm = (idForm,form)=>{
        idForm = idForm.replace('#','');
        idForm = idForm.replace(/\-/g,'_');
        forms[idForm] = form;
    }
    const resetForm = (idForm,selectpicker)=>{
        idForm = idForm.replace('#','');
        idForm = '#'+idForm;

        $(idForm+' input*').val('');
        $(idForm+' input[type="checkbox"]').prop('checked', false);
        $(idForm+' select option[value=""]').prop('selected', true);        

        if( typeof selectpicker !== 'undefined' && selectpicker)
            $(idForm+' select').selectpicker('refresh');        
    }
    
    const getObjectForm = (idForm)=>{
        let result = new Object();
        idForm = idForm.replace('#','');
        idForm ='#'+idForm;
        let form = idForm.replace(/\-/g,'_').replace('#','');
        let inputs = forms[form];
       
       inputs.forEach((item)=>{
         switch(item.type){
             case 'input':
               result[item.name] = {
                   value:$(idForm+' input[name="'+item.name+'"]').val() != ''?$(idForm+' input[name="'+item.name+'"]').val():null}
               break;
             case 'date':
                result[item.name] = {
                    value:$(idForm+' input[name="'+item.name+'"]').val() != ''?$(idForm+' input[name="'+item.name+'"]').val():null}
                break;
             case 'select':
                result[item.name] = {
                    value:$(idForm+' select[name="'+item.name+'"]').val() != ''?$(idForm+' select[name="'+item.name+'"]').val():null,
                    text:$(idForm+' select[name="'+item.name+'"]').val() != ''?$(idForm+' select[name="'+item.name+'"] option:selected').text():null
                }       
                break;
            case 'textarea':
                result[item.name] = {
                    value:$(idForm+' textarea[name="'+item.name+'"]').val() != ''? $(idForm+' textarea[name="'+item.name+'"]').val():null
                }
                break;
            case 'checkbox':
                result[item.name] = {
                    value:$(idForm+' input[name="'+item.name+'"]').prop('checked')
                }
                break;
            case 'radio':
                result[item.name] = {value: $(idForm+' input[name="'+item.name+'"]:checked').val()}
                break;
            default:
                result['undefined_type'] = {
                    value:$(idForm+' '+item.type+'[name="'+item.name+'"]').val(),
                    text:$(idForm+' '+item.type+'[name="'+item.name+'"]').text()
                }  
               break;
         }
       })
      return result
    }

    const setValuesInInputs = (idForm,especification,obj,selectpicker)=>{
        
        let form = idForm.replace(/\-/g,'_').replace('#');
        let inputs = forms[form];

        idForm = idForm.replace(/\#/g,'');
        idForm ='#'+idForm;

        let keysEspecification = Object.keys(especification);       

        keysEspecification.forEach((key)=>{
            inputs.forEach((input)=>{
                if(key == input.name){
                   
                    switch(input.type){
                        case 'input':
                            $(idForm+' input[name="'+input.name+'"]').val(obj[especification[key]]);
                        break;
                        case 'date':
                            let date = formatTypeDate(obj[especification[key]]);
                            $(idForm+' input[name="'+input.name+'"]').val(date);
                            break;
                        case 'select':
                            $(idForm+' select[name="'+input.name+'"] option[value="'+obj[especification[key]]+'"]').prop('selected', true);
                            if(typeof selectpicker !== 'undefined' && selectpicker)
                                $(idForm+' select').selectpicker('refresh');      
                            break;
                        case 'textarea':
                            $(idForm+' textarea[name="'+input.name+'"]').val(obj[especification[key]]);
                            break;
                        case 'checkbox':
                           $(idForm+' input[name="'+input.name+'"]').prop('checked',obj[especification[key]]);
                            break;
                        case 'radio':
                            $(idForm+' input[name="'+input.name+'"][value="'+obj[especification[key]]+'"]').prop('checked',true);
                            break;
                        default:
                            console.exception('Type undefined!',input); 
                        break;
                    }
                }
            })
        })
    }
    const validationForm = (idForm)=>{
        let form = idForm.replace(/\-/g,'_').replace('#','');
        idForm = idForm.replace('#','');
        idForm = '#'+idForm;
        let inputs = forms[form];
        let validation = true;
        for(let i=0;i<inputs.length;i++){
            let item = inputs[i];

            if(typeof item.validation !== 'undefined'){
                if(item.validation){
                    switch(item.type){
                        case 'input':
                            validation = $(idForm+' input[name="'+item.name+'"]').val() != ''? true:false;
                            break;
                        case 'date':
                            validation = $(idForm+' input[name="'+item.name+'"]').val() != ''? true:false;
                            break;
                        case 'select':
                            validation = $(idForm+' select[name="'+item.name+'"]').val() != ''? true:false;
                            break;
                        case 'textarea':
                            validation = $(idForm+' textarea[name="'+item.name+'"]').val() != ''? true:false;
                            break;
                        case 'checkbox':
                            //validation = $(idForm+' input[name="'+item.name+'"]').val() != ''? true:false;
                            break;
                        case 'radio':
                            validation = typeof $(idForm+' input[name="'+item.name+'"]:checked').val() === 'undefined'? false:true;
                            break;
                        default:
                            validation = false;                           
                            console.exception('Type undefined!',input); 
                            break;
                        break;                        
                    }
                   
                    if(!validation){
                        break;
                    }
                }
            }else{                
                console.exception("Validation undefined!",item);   
                return false;             
            } 
        }      
        return validation;
    }

    const activeBootstrapValidator = (idForm,fields,faIcon,excluded)=>{
        idForm ='#'+idForm.replace('#','');
       
        let field ={};
        
        fields.forEach((item)=>{
            field[item.name]={
                validators: {
                    notEmpty: {
                        message: item.msg
                    }
                }
            }
        })       
       console.log(field);
        $(idForm).bootstrapValidator({
            excluded: excluded,
            feedbackIcons: faIcon,
            fields: field
        }).on('status.field.bv', function(e, data) {
            var $form     = $(e.target),
            validator = data.bv,
            $tabPane  = data.element.parents('.tab-pane'),
            tabId     = $tabPane.attr('id');
            
            
            if (tabId) {
                var $icon = $('a[href="#' + tabId + '"][data-toggle="tab"]').parent().find('i');
                // Add custom class to tab containing the field
            if (data.status == validator.STATUS_INVALID) {
                $icon.removeClass(faIcon.valid).addClass(faIcon.invalid);
                let help_block = $('small[class="help-block"]').css('text-color','red');
            } else if (data.status == validator.STATUS_VALID) {
                var isValidTab = validator.isValidContainer($tabPane);
                $icon.removeClass(faIcon.valid).addClass(isValidTab ? faIcon.valid : faIcon.invalid);
            }
            }

            if (data.status == validator.STATUS_INVALID) {   
                 $('small[class="help-block"]').addClass('text-danger');
            } else if (data.status == validator.STATUS_VALID) {                
                //$icon.removeClass(faIcon.valid).addClass(isValidTab ? faIcon.valid : faIcon.invalid);
            }
        });
    }

    return {
        resetForm,
        getObjectForm,
        setValuesInInputs,
        setForm,
        validationForm,
        activeBootstrapValidator
    }
}

