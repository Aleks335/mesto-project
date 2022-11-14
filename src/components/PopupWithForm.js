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

  setButtonCompleteState() {
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
      this.setButtonCompleteState();
      this.form.reset();
    }, 500);
  }

  open() {
    if (this.preparePopupMethod) {
      this.preparePopupMethod();
    }
    super.open();
  }

  _getInputValues() {
    let obj = {};
    this.inputsList.forEach((input) => {
      obj[input.name] = input.value;
    });

    return obj;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setButtonLoadState();
      this.apiMethod(this._getInputValues());
    });
  }
}
