import {openPopup} from "./modal";

class Card {
    constructor(name, link, templateSelector, likes, isOwner, cardID) {
        this.name = name;
        this.link = link;
        this.templateSelector = templateSelector;
        this.likesCount = likes.length;
        this.likes = likes;
        this.isOwner = isOwner;
        this.cardID = cardID;
    }

    createCard(cardHandlers, profileID) {
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
        cardElement.querySelector('.element__smiley-numbers').textContent = this.likesCount;
        this.isLiked = this.isCardLiked(profileID);
        if (this.isLiked)
            this.toggleLike(cardElement.querySelector('.element__smiley'))
        this.cardElement = cardElement;
        this.setEventListener(cardHandlers, cardElement, elementPhoto, popupImageUrl, popupImg, removeButton);
    }

    isCardLiked(profileID) {
        let isLiked = false;
        this.likes.forEach((item) => {
            if (item._id === profileID)
                isLiked = true
        })
        return isLiked;
    }

    toggleLike(element) {
        element.classList.toggle('element__smiley_black');
    }

    incLike(evt) {
        this.toggleLike(evt.target);
        this.likesCount++;
        this.cardElement.querySelector('.element__smiley-numbers').textContent = this.likesCount;
        this.isLiked = true;
    }

    decLike(evt) {
        this.toggleLike(evt.target);
        this.likesCount--;
        this.cardElement.querySelector('.element__smiley-numbers').textContent = this.likesCount;
        this.isLiked = false;
    }


    setEventListener(cardHandlers, cardElement, elementPhoto, popupImageUrl, popupImg, removeButton = null) {
        if (removeButton)
            removeButton.addEventListener('click', (evt) => {
                cardHandlers.cardDeleteCardHandler(this, evt);
            });

        elementPhoto.addEventListener('click', () => {
            popupImageUrl.src = this.link;
            popupImageUrl.alt = this.name;
            popupImg.querySelector('.popup__image-name').textContent = this.name;
            openPopup(popupImg);
        })
        cardElement.querySelector('.element__smiley').addEventListener('click', (evt) => {
            console.log(this.isLiked)
            if (this.isLiked) {
                cardHandlers.cardDeleteLikeHandler(this, evt);
            } else {
                cardHandlers.cardAddLikeHandler(this, evt)
                console.log(this)
            }

        })
    }
}

export {
    Card,
}
