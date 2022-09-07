import {openPopup} from "./modal";

class Card {
    constructor(name, link, templateSelector) {
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
        this.createCard();
    }

    createCard() {
        const template = document.querySelector(this.templateSelector).content;
        const cardElement = template.querySelector(".element").cloneNode(true);
        const popupImg = document.querySelector('.popup_img');
        const elementPhoto = cardElement.querySelector('.element__photo');
        const popupImageUrl = popupImg.querySelector('.popup__image-url');

        cardElement.querySelector('.element__title').textContent = this.name;
        elementPhoto.src = this.link;
        elementPhoto.alt = this.name;

        this.cardElement = cardElement;
        this.setEventListener(cardElement, elementPhoto, popupImageUrl, popupImg);
    }

    setEventListener(cardElement, elementPhoto, popupImageUrl, popupImg) {
        cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
        elementPhoto.addEventListener('click', () => {
            openPopup(popupImg);
            popupImageUrl.src = this.link;
            popupImageUrl.alt = this.name;
            popupImg.querySelector('.popup__image-name').textContent = this.name;
        })
        cardElement.querySelector('.element__smiley').addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__smiley_black');
        })
    }
}

export {
    Card,
}
