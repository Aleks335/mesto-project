class Card {
    constructor(name, link, templateSelector, likes, isOwner, cardID) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._likesCount = likes.length;
        this._likes = likes;
        this._isOwner = isOwner;
        this.cardID = cardID;
    }

    createCard(cardHandlers, profileID, openPopupCallback) {
        const template = document.querySelector(this._templateSelector).content;
        const cardElement = template.querySelector(".element").cloneNode(true);
        const popupImg = document.querySelector('.popup_img');
        const elementPhoto = cardElement.querySelector('.element__photo');
        const popupImageUrl = popupImg.querySelector('.popup__image-url');
        let removeButton = null;
        if (this._isOwner) {
            removeButton = document.createElement('button');
            removeButton.classList.add('element__delete');
            cardElement.prepend(removeButton);
        }
        cardElement.querySelector('.element__title').textContent = this._name;
        elementPhoto.src = this._link;
        elementPhoto.alt = this._name;
        cardElement.querySelector('.element__smiley-numbers').textContent = this._likesCount;
        this.isLiked = this._isCardLiked(profileID);
        if (this.isLiked)
            this._toggleLike(cardElement.querySelector('.element__smiley'))
        this.cardElement = cardElement;
        this._setEventListener(cardHandlers, cardElement, elementPhoto, popupImageUrl, popupImg, removeButton, openPopupCallback);
        return this.cardElement;
    }

    _isCardLiked(profileID) {
        let isLiked = false;
        this._likes.forEach((item) => {
            if (item._id === profileID)
                isLiked = true
        })
        return isLiked;
    }

    _toggleLike(element) {
        element.classList.toggle('element__smiley_black');
    }

    incLike(evt) {
        this._toggleLike(evt.target);
        this._likesCount++;
        this.cardElement.querySelector('.element__smiley-numbers').textContent = this._likesCount;
        this.isLiked = true;
    }

    decLike(evt) {
        this._toggleLike(evt.target);
        this._likesCount--;
        this.cardElement.querySelector('.element__smiley-numbers').textContent = this._likesCount;
        this.isLiked = false;
    }


    _setEventListener(cardHandlers, cardElement, elementPhoto, popupImageUrl, popupImg, removeButton = null, openPopupCallback) {
        if (removeButton)
            removeButton.addEventListener('click', (evt) => {
                cardHandlers.cardDeleteCardHandler(this, evt);
            });

        elementPhoto.addEventListener('click', () => {
            openPopupCallback(this._link, this._name);
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
