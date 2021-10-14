function mainFunction(){  
    console.log('mainFunction()');
    let isError = false;
    let errorText = '';
    let keywrd = document.getElementById('keyWord').value;
    let initialDate = document.getElementById('intervalInitial').value;
    let finalDate = document.getElementById('intervalFinal').value;
    let interval;

    //urlParams
    //const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);

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
    else{
        hideErrorMessage();        
        //Start Genesys Cloud conexión api
        try{
            getConversationByInterval(interval);            
        }catch (e){
            isError = true;
            errorText += '//' + e.message;
        }
    }

    //Check if exists errors for api calls
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
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\#&]" + name + "=([^&#]*)"),
      results = regex.exec(location.hash);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Funciones de llamada a genesys
function getConversationByInterval(interval){

    console.log('getConversationByInterval('+interval+')');
    // Implicit grant credentials
    const CLIENT_ID = '37e0173d-4787-4058-8339-de3b83c63dec';

    // Genesys Cloud environment
    const ENVIRONMENT = 'mypurecloud.ie';
    //Iniciamos token
    var token;
    
    if(window.location.hash) {
        token = getParameterByName('access_token');
    } else {
        var queryStringData = {
            response_type : "token",
            client_id : CLIENT_ID,
            redirect_uri : "http://localhost:8085/oauth2/callback"
        };

        window.location.hash.replace(`https://login.${ENVIRONMENT}/oauth/authorize?` + jQuery.param(queryStringData));
    }
    console.log('access_token : ' + token);
    //token pruebas
    token = 'uGJOCXccFspKz_vNboRr-2kB5Pe-rh6BMgaZlM3aYmMyUX1zyp8Oh9HoSi8rrcDXwmnEYK5bn1Ycz5EJTR5W3w';
    // Manually set auth token or use loginImplicitGrant(...) or loginClientCredentialsGrant(...)        
    platformClient.ApiClient.instance.setAccessToken(token);
    
    let body = {"interval": interval}; // Object | Search request options
    console.log(body);
    
    //platformClient.ApiClient.instance.setAccessToken('uGJOCXccFspKz_vNboRr-2kB5Pe-rh6BMgaZlM3aYmMyUX1zyp8Oh9HoSi8rrcDXwmnEYK5bn1Ycz5EJTR5W3w');
    let apiInstance = new platformClient.AnalyticsApi();
    
    apiInstance.postAnalyticsConversationsTranscriptsQuery(body)
    .then((data) => {
        console.log(`postAnalyticsConversationsTranscriptsQuery success! data: ${JSON.stringify(data, null, 2)}`);
    })
    .catch((err) => {
        console.log('There was a failure calling postAnalyticsConversationsTranscriptsQuery');
        console.log(err.message);
    });  

}
