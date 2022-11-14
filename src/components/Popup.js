export class Popup {
  constructor(selector) {
    this.popup = document.querySelector(selector);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const removeButton = this.popup.querySelector(".popup__close-min");
    this.popup.addEventListener("mousedown", (evt) => {
      if (evt.target === this.popup || evt.target === removeButton) {
        this.close();
      }
    });
  }

  open() {
    this.popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
