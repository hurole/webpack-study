import './styles/index.css'

import $ from 'jquery';
class Person {
  constructor(name) {
    this.name = name;
  }
}
// jquery
let el = $('#app')
console.log(el);
// ES6
let p = new Person('Jack');
console.log(p);

setTimeout(function () {
  // dynamic import js
  import('./js/async.js').then(res => {
    console.log(res.obj);
  }).catch(e => {
    console.log(e);
  })
  // dynamic import css
  import('./styles/test.css');
}, 2000)