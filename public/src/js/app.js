// var $ = {
//   sel: function(el) {
//     return document.querySelector(el);
//   }
// };

var $template = document.querySelector('#template');
$template.remove();
$template.removeAttribute('id');


var $name = document.querySelector('#name');
var $content = document.querySelector('#content');
var $msgContainer = document.querySelector('.messages');
var $typing = document.querySelector('#is-typing');
var name = '';

function displayMessage(msg) {
  var $msg = $template.cloneNode(true);
  $msg.children[0].innerHTML = msg.name;
  $msg.children[1].innerHTML = msg.content;
  $msgContainer.appendChild($msg);
  $msgContainer.scrollTop = $msgContainer.scrollHeight;
};

var socket = io(document.baseURI);

socket.on('connected', function(data) {});

socket.on('message', function(data) {
  displayMessage(data);
});

socket.on('someoneIsTyping', function() {
  if ($typing.classList.contains('hidden')) {
    $typing.classList.remove('hidden')
  }
});

$name.addEventListener('input', function() {
  name = this.value;
});

setInterval(function() {
  if (!$typing.classList.contains('hidden')) {
    $typing.classList.add('hidden')
  }
}, 1000);

var lastSentSocket = 0;
$content.addEventListener('keyup', function(e) {
  if (Date.now() - lastSentSocket > 3000) {
    console.log('SEND')
    lastSentSocket = Date.now();
    socket.emit('typing', {name: name})
  }

  if (e.keyCode === 13 && name.length > 2) {
    var message = {
      name: name,
      content: this.value
    }
    displayMessage(message);
    socket.emit('newMessage', message);
    this.value = '';
  }
});
