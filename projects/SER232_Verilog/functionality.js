
(
var myBook = document.registerElement('my-book');
document.body.appendChild(new myBook());
myBook.addEventListener('click', function(e) {
  alert('Thanks!');
});


)