import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
  constructor(selector, apiMethod, preparePopupMethod = false) {
    super(selector);
    this.apiMethod = apiMethod;
    this.form = this.popup.querySelector(".popup__form");
    this.preparePopupMethod = preparePopupMethod;
    this.inputsList = this.popup.querySelectorAll(".popup__input");
    this.submitButton = this.form.querySelector(".popup__button");
    this.submitButtonDefaultText = this.submitButton.textContent;
  }

  _setButtonLoadState() {
    this.submitButton.textContent = "Сохранение...";
  }

  _setButtonCompleteState() {
    this.submitButton.textContent = this.submitButtonDefaultText;
  }

  hideErrors() {
    this.inputsList.forEach((input) => {
      const spanError = document.querySelector("#" + input.id + "-error");
      spanError.textContent = "";
      spanError.classList.remove(this.errorClass);
      spanError.textContent = "";
    });
  }

  close() {
    super.close();
    setTimeout(() => {
      this._setButtonCompleteState();
      this.form.reset();
    }, 500);
  }

  open() {
    if (this.preparePopupMethod) {
      this.preparePopupMethod();
    }
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    const [firstInput, secondInput] = this.inputsList;
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setButtonLoadState();
      secondInput
        ? this.apiMethod(firstInput.value, secondInput.value)
        : this.apiMethod(firstInput.value);
    });
  }
}
