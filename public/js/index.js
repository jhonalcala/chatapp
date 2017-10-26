
var socket = io();

socket.on('connect', function(){
    console.log('Connection Success');

})

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
})

socket.on('newMessage', function(message){
    var timeStamp = moment(message.createdAt).format('HH: MM A ');
    var li = jQuery('<li></li>');

    li.text(`${message.from}: ${timeStamp}: ${message.text}`);
    jQuery('#messages').append(li);
   
})

socket.on('newLocationMessage', function(message) {
    var timeStamp = moment(message.createdAt).format('HH: MM A ');
    var li =jQuery('<li></li>');
    var a = jQuery('<a target="_black">My Current Location</a>');

    li.text(`${message.from} ${timeStamp}`);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
    
})

    var messageClear = jQuery('[name=message')

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'user',
        text: messageClear.val()
    }, function() {
        messageClear.val('')
    })
})

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation is not available by your browser');
    }

    locationButton.attr('disable', 'disable');

    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disable', 'disable');
        socket.emit('createLocationMessage', {
                     
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disable', 'disable');
        alert('Unable to fetch location');
    })
})