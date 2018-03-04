// Make connection

const socket = io.connect('http://localhost:2700');


// Query DOM

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// Emit Events

btn.addEventListener('click', function() {
  const personName = (!!handle.value) ? handle.value : 'Anonym :<';
  socket.emit('chat', {
    message: message.value,
    handle: personName
  });
  message.value = '';
});

message.addEventListener('keypress', function() {
  const personName = (!!handle.value) ? handle.value : 'Anonym :<';
  socket.emit('typing', personName);
});


// Listen for Events
socket.on('chat', function(data) {
  output.innerHTML += '<p> <strong>' + data.handle + '</strong>: ' + data.message + '</p>';
  feedback.innerHTML = '';
});

socket.on('typing', function(data) {
  feedback.innerHTML = '<p><i>' + data + ' is typing...</i></p>';
});
