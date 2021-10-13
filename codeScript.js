function mainFunction(){  
    console.log('mainFunction()');
    let isError = false;
    let errorText = '';
    let keywrd = document.getElementById('keyWord').value;
    let initialDate = document.getElementById('intervalInitial').value;
    let finalDate = document.getElementById('intervalFinal').value;
    let interval;

    //check if keyword Variable is defined
    if(typeof(keywrd) == 'undefined' || keywrd == null || keywrd == '') { 
        isError = true;
        errorText += '//Indique un texto a buscar';
    } 
    //check if initial date Variable is defined
    if(typeof(initialDate) == 'undefined' || initialDate == null || initialDate == '') { 
        isError = true;
        errorText += '//Debe indicar una fecha de inicio v&aacute;lida';
    } else if(typeof(finalDate) == 'undefined' || finalDate == null || finalDate == '') { //check if final date Variable is defined
        isError = true;
        errorText += '//Debe indicar una fecha final v&aacute;lida';
    } else{
        interval = initialDate+':00.000Z/'+finalDate+':00.000Z';
        console.log(interval);
    }
    
    //Enviamos el error
    if(isError) errorMessage(errorText);
    else hideErrorMessage();
}

function errorMessage(errorMSG) {
    var error = document.getElementById("error");
    error.innerHTML = "<span style='color: red;'>"+errorMSG+"</span>"    ;
}
function hideErrorMessage(){
    document.getElementById("error").style.display= 'none';
}

function getConversationByInterval(){
    
}
