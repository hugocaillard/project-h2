var $ = {
  sel: function(el) {
    return document.querySelector(el);
  }
};

var $name = $.sel('#name');

console.log($name);
