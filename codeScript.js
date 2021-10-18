function mainFunction(){  
    console.log('mainFunction()');
    let isError = false;
    let errorText = '';
    let keywrd = document.getElementById('keyWord').value;
    let initialDate = document.getElementById('intervalInitial').value;
    let finalDate = document.getElementById('intervalFinal').value;
    let interval;

    //urlParams
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

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
            console.log(urlParams.get('clientId'));
            console.log(urlParams.get('environment'));
            getConversationByInterval(interval, urlParams.get('clientId'), urlParams.get('environment'));            
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
function getConversationByInterval(interval, clientId, environment){

    console.log('getConversationByInterval('+interval+')');
    // Implicit grant credentials
    const CLIENT_ID = clientId; //'37e0173d-4787-4058-8339-de3b83c63dec';

    // Genesys Cloud environment
    const ENVIRONMENT = 'mypurecloud.' + environment; //'mypurecloud.ie';

    console.log(CLIENT_ID);
    console.log(ENVIRONMENT);
    
    //Iniciamos token
    var token;
    //Body for conversation call api
    let body = {"interval": interval}; // Object | Search request options
        
    console.log(' III ');
    const client = platformClient.ApiClient.instance;
    client.setEnvironment(ENVIRONMENT);
    client.loginImplicitGrant(CLIENT_ID, 'https://xdrui22.github.io/testGenesysAPP/index.html', { state: '' })
    .then((data) => {
        console.log(data);
        // Do authenticated things
    })
    .catch((err) => {
        // Handle failure response
        console.log(err);
    });
    
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
