export class FormValidator {
  constructor(
    {
      inputSelector,
      inactiveButtonClass,
      errorClass,
      spanError,
      submitButtonClass,
    },
    formElement
  ) {
    this.formElement = formElement;
    this.submitButtonElement = formElement.querySelector(submitButtonClass);
    this.inactiveButtonClass = inactiveButtonClass;
    this.errorClass = errorClass;
    this.spanError = spanError;
    this.inputList = formElement.querySelectorAll(inputSelector);
  }

  _showErrorMessage(input) {
    let errorMessage = input.validationMessage;
    if (input.validity.patternMismatch) {
      errorMessage = input.dataset.error;
    }
    const spanError = document.querySelector("#" + input.id + this.spanError);
    spanError.classList.add(this.errorClass);
    spanError.textContent = errorMessage;
  }

  _hideErrorMessage(input) {
    const spanError = document.querySelector("#" + input.id + this.spanError);
    spanError.textContent = "";
    spanError.classList.remove(this.errorClass);
    spanError.textContent = "";
  }

  hideErrors() {
    this.inputList.forEach((item) => {
      this._hideErrorMessage(item);
    });
  }

  _validateFormEnable() {
    this.formElement.addEventListener("input", () => {
      const isError = !this.formElement.checkValidity();
      this.submitButtonElement.disabled = isError;
      this.submitButtonElement.classList.toggle(
        this.inactiveButtonClass,
        isError
      );
    });
  }

  showInputsErrors() {
    this.inputList.forEach((i) => {
      i.addEventListener("input", () => {
        if (!i.validity.valid) {
          this._showErrorMessage(i);
        } else {
          this._hideErrorMessage(i);
        }
      });
    });
  }

  disableButton() {
    this.submitButtonElement.disabled = true;
    this.submitButtonElement.classList.add(this.inactiveButtonClass);
  }

  validateForm() {
    this._validateFormEnable();
    this.showInputsErrors();
  }
}
