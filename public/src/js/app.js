var $ = {
  sel: function(el) {
    return document.querySelector(el);
  }
};

var $msgContainer = $.sel('.messages');

function displayMessage(msg) {
  var $name = document.createElement('span')
  $name.innerHTML = msg.name;
  var $content = document.createElement('span');
  $content.innerHTML = msg.content;

  var $msg = document.createElement('div');
  $msg.classList.add('message');
  $msg.appendChild($name);
  $msg.appendChild($content);
  $msgContainer.appendChild($msg);
  $msgContainer.scrollTop = $msgContainer.scrollHeight;
};

var socket = io('http://localhost:3000');
socket.on('connected', function(data) {
  console.log(data);
});

var $name = $.sel('#name');
var $content = $.sel('#content');
var name = '';

console.log($name);

$name.addEventListener('input', function() {
  name = this.value;
});

$content.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    var message = {
      name: name,
      content: this.value
    };
    socket.emit('messageClient', message);
    displayMessage(message);
    this.value = '';
  }
});

socket.on('messageServer', function(data) {
  console.log(data);
  displayMessage(data);
});
