/*function enableValidation(selectors) {
    const popupForms = document.querySelectorAll(selectors.formSelector);
    popupForms.forEach((a) => {
        setEventListener(a, selectors);
    })
}

function setEventListener(formElement, settings) {
    formElement.addEventListener('input', () => {
        const isError = !formElement.checkValidity();
        const submitButton = formElement.querySelector(settings.submitButtonSelector);
        submitButton.disabled = isError;
        submitButton.classList.toggle(settings.inactiveButtonClass, isError);
    });
    const popupInputs = formElement.querySelectorAll(settings.inputSelector);
    popupInputs.forEach((i) => {
        //перебираем все элементы
        i.addEventListener("input", () => {
            if (!i.validity.valid) {
                let errorMessage = i.validationMessage;
                if (i.validity.patternMismatch) {
                    errorMessage = i.dataset.error;
                }
                const spanError = document.querySelector('#' + i.id + settings.spanError);
                // костана с ошибкой + id -error
                spanError.classList.add(settings.errorClass);
                //добавляем класс
                spanError.textContent = errorMessage;
                // выводим ошибку
            } else {
                const spanError = document.querySelector('#' + i.id + settings.spanError);
                spanError.textContent = '';
                spanError.classList.remove(settings.errorClass);// убираем класс
                spanError.textContent = '';// скидываем содержимое
            }
        });
    });
}

export {
    enableValidation,
} */

export class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
      spanError,
    },
    formElement
  ) {
    this.formElement = formElement;
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this.spanError = spanError;
  }

  _showErrorMessage(input){
    let errorMessage = input.validationMessage;
    if (input.validity.patternMismatch) {
      errorMessage = input.dataset.error;
    }
    const spanError = document.querySelector("#" + input.id + this.spanError);
    spanError.classList.add(this.errorClass);
    spanError.textContent = errorMessage;
  }

  _hideErrorMessage(input){
    const spanError = document.querySelector("#" + input.id + this.spanError);
          spanError.textContent = "";
          spanError.classList.remove(this.errorClass);
          spanError.textContent = "";
  }

  _validateFormEnable(){
    this.formElement.addEventListener("input", () => {
      const isError = !this.formElement.checkValidity();
      const submitButton = this.formElement.querySelector(
        this.submitButtonSelector
      );
      submitButton.disabled = isError;
      submitButton.classList.toggle(this.inactiveButtonClass, isError);
    });
  }

  showInputsErrors(){
    const popupInputs = this.formElement.querySelectorAll(this.inputSelector);
    popupInputs.forEach((i) => {
      i.addEventListener("input", () => {
        if (!i.validity.valid) {
          this._showErrorMessage(i)
        } else {
          this._hideErrorMessage(i)
        }
      });
    });
  }

  validateForm() {
    this._validateFormEnable();
    this.showInputsErrors()
  }
}
