// var $ = {
//   sel: function(el) {
//     return document.querySelector(el);
//   }
// };

var $name = document.querySelector('#name');
var $content = document.querySelector('#content');
var name = '';

console.log($name.value);

$name.addEventListener('input', function() {
  name = this.value;
});

$content.addEventListener('keyup', function(e) {
  if (e.keyCode === 13) {
    // ENVOYER LE MESSAGE
    this.value = '';
  }
});


// function displayMessage(msg) {
//   var $name = document.createElement('span')
//   $name.innerHTML = msg.name;
//   var $content = document.createElement('span');
//   $content.innerHTML = msg.content;
//
//   var $msg = document.createElement('div');
//   $msg.classList.add('message');
//   $msg.appendChild($name);
//   $msg.appendChild($content);
//   $msgContainer.appendChild($msg);
//   $msgContainer.scrollTop = $msgContainer.scrollHeight;
// };
