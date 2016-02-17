var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    console.log('New message:');
    console.log(message.text);
});

// handles submitting of new message
// $ is a naming standard to mean jquery instance
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
    // send it on our own and not to refresh
    event.preventDefault();
    var $message = $form.find('input[name=message]');

    socket.emit('message', {
        text: $message.val()
    });

    // add code to erase the input
    $message.val('');
});
