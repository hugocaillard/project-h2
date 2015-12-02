import $ from './tools.js';

window.log = Function.prototype.bind.call(console.log, console);

$.get('/api/', (status, data) => console.log(status, data));

const socket = io.connect(document.baseURI);
socket.on('connected', data => console.log(data));

const $msgContainer = $.sel('.messages');
const $name = $.sel('#name');
const $content = $.sel('#content');

function displayMessage(msg) {
  let $name = document.createElement('span')
  $name.innerHTML = msg.name;
  let $content = document.createElement('span');
  $content.innerHTML = msg.content;

  let $msg = document.createElement('div');
  $msg.classList.add('message');
  $msg.appendChild($name);
  $msg.appendChild($content);
  $msgContainer.appendChild($msg);
  $msgContainer.scrollTop = $msgContainer.scrollHeight;
};

const getLastMessage = () => {
  $.get('/api/messages', function(status, data) {
    data.forEach(msg => displayMessage(msg));
  });
};
getLastMessage();

let name = '';
$name.addEventListener('input', function() {
  name = this.value;
});

$content.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    let body = {name, content: this.value};
    socket.emit('message', body);
    displayMessage(body);
    this.value = '';
  }
});

socket.on('message', body => displayMessage(body));
socket.on('message-error', err => console.error(err));
