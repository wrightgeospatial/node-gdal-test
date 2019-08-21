console.log('Main Application Loaded...')

//Run a fetch
var message1 = document.querySelector('#message-1')

fetch('http://localhost:3000/data').then((response)=>{
    response.json().then((data) =>{
        
        message1.textContent = data.geometry

    })
    

})


var file = document.querySelector('#file')
