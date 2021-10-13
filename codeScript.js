function mainFunction(){  
    console.log('mainFunction()');
    let keywrd = document.getElementById('keyWord').value;

    if(typeof(keywrd) == 'undefined' || keywrd == null || keywrd == '') { 
        console.log('undefined');
        alert('Indique un texto a buscar');
    } else {
        console.log(keywrd);
        alert(keywrd);
    }
      
}
