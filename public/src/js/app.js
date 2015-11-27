// var $ = {
//   sel: function(el) {
//     return document.querySelector(el);
//   }
// };

var $name = document.querySelector('#name');
var $content = document.querySelector('#content');
var $msgContainer = document.querySelector('.messages');
var name = '';

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

var socket = io(document.baseURI);

socket.on('connected', function(data) {
  console.log(data);
});

socket.on('message', function(data) {
  // AFFICHER LE MESSAGE
  displayMessage(data);
  console.log(data);
})

$name.addEventListener('input', function() {
  name = this.value;
});

$content.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    socket.emit('newMessage', {
      name: name,
      content: this.value
    });
    this.value = '';
  }
});
