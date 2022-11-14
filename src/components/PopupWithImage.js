import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector, popupImageUrlElement, popupImageNameElement) {
    super(selector);
    this.popupImageUrlElement = popupImageUrlElement;
    this.popupImageNameElement = popupImageNameElement;
  }

  open(src, text) {
    this.popupImageUrlElement.src = src;
    this.popupImageNameElement.textContent = text;
    this.popupImageUrlElement.alt = text;
    super.open();
  }
}
