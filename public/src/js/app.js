import $ from './tools.js';

window.log = Function.prototype.bind.call(console.log, console);

$.get('/api/', (status, data) => console.log(status, data));
