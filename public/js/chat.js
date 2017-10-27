var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

  socket.on('connect', function () {
    var params = jQuery.deparam(window.location.search);
  
    socket.emit('join', params, function (err) {
      if (err) {
        alert(err);
        window.location.href = '/';
      } else {
        console.log('No error');
      }
    })

})

socket.on('disconnect', function(){
    console.log('Disconnected from the server');
})


socket.on('updateUserList', function (users) {
    var ol = jQuery('<ol></ol>');
  
    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    })
  
    jQuery('#users').html(ol);
  })


socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
  
    jQuery('#messages').append(html);
    scrollToBottom();
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

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
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
        locationButton.removeAttr('disabled').text('Sending....');
        socket.emit('createLocationMessage', {
                     
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function(){
        locationButton.removeAttr('disabled').text('Sending.....');
        alert('Unable to fetch location');
    })
})