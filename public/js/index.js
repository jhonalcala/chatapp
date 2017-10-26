var socket = io();

socket.on('connect', function(){
    console.log('Connection Success');

   
})

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
})

socket.on('email', function(email){
    console.log('New Email', email)
})