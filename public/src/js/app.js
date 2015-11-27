var $ = {
  sel: function(el) {
    return document.querySelector(el);
  }
};

var $msgContainer = $.sel('.messages');
var $template = $.sel('#template');
$template.remove();
console.log($template.children);

function displayMessage(msg) {
  var $msg = $template.cloneNode(true);
  $msg.children[0].innerHTML = msg.name;
  $msg.children[1].innerHTML = msg.content;
  $msgContainer.appendChild($msg);
  $msgContainer.scrollTop = $msgContainer.scrollHeight;
}

var socket = io(document.baseURI);
socket.on('connected', function(data) {
  console.log(data.messages);
  data.messages.forEach(function(msg) {
      displayMessage(msg);
  });
});

var $name = $.sel('#name');
var $content = $.sel('#content');
var name = '';


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
