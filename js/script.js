import '../style/style.css';
import Pagination from './pagination';
import validation from './validation';

let pagination = new Pagination();
window.onload = function () {
  pagination.init()
  validation();
}
let form = document.querySelector('form');
let myButton = document.getElementById('input-form');
myButton.addEventListener('submit', function (ev) {
  ev.preventDefault();
  let name = document.forms['input-form'].elements['name'].value;
  let text = document.forms['input-form'].elements['comment'].value;
  let obj = {
    name: name,
    text: text
  }
  ajaxSend(obj);
})
const ajaxSend = (formData) => {
  fetch('https://jordan.ashton.fashion/api/goods/30/comments', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(res => {
      alert('Сообщение отправлено');
      form.reset()
      pagination.changePage()
      validation();
    })

    .catch(error => console.log('error', error))
}
createNewComment();

