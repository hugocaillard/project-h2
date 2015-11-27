var $ = {
  sel: function(el) {
    return document.querySelector(el);
  }
};

var $msgContainer = $.sel('.messages');
console.log($msgContainer);

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
