export default function validation() {
  const form = document.querySelector('#input-form');
  const checkValidity = (input) => {
    input.classList.remove('text-field__input_invalid');
    input.nextElementSibling.textContent = '';
    if (!input.checkValidity()) {
      input.classList.add('text-field__input_invalid');
      input.nextElementSibling.textContent = input.validationMessage;
    }
  }

  const checkValidityAll = () => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      checkValidity(input);
    });
  }

  const onCheckValidity = (e) => {
    const target = e.target;
    if (!target.classList.contains('text-field__input')) {
      return;
    }
    checkValidity(target);
  }

  form.addEventListener('change', onCheckValidity);
  form.addEventListener('keydown', onCheckValidity);
  form.addEventListener('keyup', onCheckValidity);


  form.addEventListener('change', (e) => {
    e.preventDefault();
    checkValidityAll();
  });
}