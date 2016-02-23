var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);

jQuery('.room-title').text(room);

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
    // new event to support room - custom event
    socket.emit('joinRoom', {
        name: name,
        room: room
    });


});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    var $messages = jQuery('.messages');
    var $message = jQuery('<li class="list-group-item"></li>');



    console.log('New message:');
    console.log(momentTimestamp.local().format('h:mma') + ': ' +
        message.text);

    $message.append('<p><strong>' + message.name + ' ' +
        momentTimestamp.local().format('h:mm a') + '</strong></p>');
    $message.append('<p>' + message.text + '</p>');

    $messages.append($message);

});

// handles submitting of new message
// $ is a naming standard to mean jquery instance
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    // send it on our own and not to refresh
    event.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        name: name,
        text: $message.val()
    });

    // add code to erase the input
    $message.val('');
});
