import '../style/style.css';
import Pagination from './pagination';
import validation from './validation';


window.onload = function () {
  let pagination = new Pagination();
  pagination.init()
  validation();
}

let myButton = document.getElementById('input-form');
myButton.addEventListener('submit', function (ev) {
  ev.preventDefault();
  let name = document.forms['input-form'].elements['name'].value;
  let text = document.forms['input-form'].elements['comment'].value;
  let obj = {
    name: name,
    text: text
  }
  ajaxSend(obj)
    .then((res) => {
      form.reset();
    })
})
const ajaxSend = (formData) => {
  fetch('https://jordan.ashton.fashion/api/goods/30/comments', {
    method: 'post',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(formData)
  })
    .then(response => alert('Сообщение отправлено'))
    .catch(error => console.log('error', error))
}
createNewComment();

