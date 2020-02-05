'use-strict'
const utils = () =>{

    const resetForm = (form,selectpicker)=>{
        $('#'+form+' input*').val('');
        $('#'+form+' select option[value=""]').prop('selected', true);

        if( typeof selectpicker !== 'undefined' && selectpicker)
            $('#'+form+' select').selectpicker('refresh');        
    }
    
    const getObjectForm = (form, inputs)=>{
        let result = new Object();
        form = form.replace('#','');
        form ='#'+form;
        
       inputs.forEach((item)=>{
         switch(item.type){
             case 'input':
               result[item.name] = {value:$(form+' '+item.type+'[name="'+item.name+'"]').val()}
               break;
             case 'select':
                result[item.name] = {
                    value:$(form+' select[name="'+item.name+'"]').val(),
                    text:$(form+' select[name="'+item.name+'"] option:selected').text()
                }       
                break;
            case 'textarea':
                result[item.name] = {value:$(form+' textarea[name="'+item.name+'"]').val()}
                break;
            case 'checkbox':
                result[item.name] = {value:$(form+' input[name="'+item.name+'"]').prop('checked')}
                break;
            case 'radio':
                result[item.name] = {value: $(form+' input[name="'+item.name+'"]:checked').val()}
                break;
            default:
                result['undefined_type'] = {
                    value:$(form+' '+item.type+'[name="'+item.name+'"]').val(),
                    text:$(form+' '+item.type+'[name="'+item.name+'"]').text()
                }  
               break;
         }
       })
      return result
    }

    const setValuesInInputs = (form,inputs,values)=>{
        
    }

    return {
        resetForm,
        getObjectForm
    }
}

