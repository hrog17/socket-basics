var socket = io();

socket.on('connect', function() {
    console.log('Connected to socket.io server!');
});

socket.on('message', function(message) {
    var momentTimestamp = moment.utc(message.timestamp);
    console.log('New message:');
    console.log(momentTimestamp.local().format('h:mma') + ': ' +
        message.text);

    jQuery('.messages').append('<p><strong>' +
        momentTimestamp.local().format('h:mm a') + ': </strong>' +
        message.text + '</p>');
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
