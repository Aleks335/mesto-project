import {openPopup} from "./modal";
import {addLike, deleteCard, deleteLike} from "./API";

class Card {
    constructor(name, link, templateSelector, likes, isOwner, cardID, isLiked) {
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
        this.likes = likes;
        this.isOwner = isOwner;
        this.cardID = cardID;
        this.isLiked = isLiked;
        this.createCard();
    }

    createCard() {
        const template = document.querySelector(this.templateSelector).content;
        const cardElement = template.querySelector(".element").cloneNode(true);
        const popupImg = document.querySelector('.popup_img');
        const elementPhoto = cardElement.querySelector('.element__photo');

        const popupImageUrl = popupImg.querySelector('.popup__image-url');
        let removeButton = null;
        if (this.isOwner) {
            removeButton = document.createElement('button');
            removeButton.classList.add('element__delete');
            cardElement.prepend(removeButton);
        }
        cardElement.querySelector('.element__title').textContent = this.name;
        elementPhoto.src = this.link;
        elementPhoto.alt = this.name;
        cardElement.querySelector('.element__smiley-numbers').textContent = this.likes;
        if (this.isLiked)
            this.toggleLike(cardElement.querySelector('.element__smiley'))
        this.cardElement = cardElement;
        this.setEventListener(cardElement, elementPhoto, popupImageUrl, popupImg, removeButton);
    }

    toggleLike(element) {
        element.classList.toggle('element__smiley_black');
    }


    setEventListener(cardElement, elementPhoto, popupImageUrl, popupImg, removeButton = null) {
        if (removeButton)
            removeButton.addEventListener('click', (evt) => {
                deleteCard(this.cardID).then(() => {
                    evt.target.closest('.element').remove();
                })
            });

        elementPhoto.addEventListener('click', () => {
            openPopup(popupImg);
            popupImageUrl.src = this.link;
            popupImageUrl.alt = this.name;
            popupImg.querySelector('.popup__image-name').textContent = this.name;
        })
        cardElement.querySelector('.element__smiley').addEventListener('click', (evt) => {
            if (this.isLiked)
                deleteLike(this.cardID).then(() => {
                    this.toggleLike(evt.target);
                    this.likes--;
                    this.cardElement.querySelector('.element__smiley-numbers').textContent = this.likes;
                });
            else addLike(this.cardID).then(() => {
                this.toggleLike(evt.target);
                this.likes++;
                this.cardElement.querySelector('.element__smiley-numbers').textContent = this.likes;
            });
        })
    }
}

export {
    Card,
}
