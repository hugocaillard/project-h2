var $ = {
  sel: function(el) {
    return document.querySelector(el);
  }
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
    console.log(this.value);

    this.value = '';
  }
});
