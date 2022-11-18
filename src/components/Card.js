class Card {
  constructor(
    name,
    link,
    templateSelector,
    likes,
    ownerID,
    cardID,
    cardOwnerID,
    { cardDeleteCardHandler, cardDeleteLikeHandler, cardAddLikeHandler }
  ) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._likesCount = likes.length;
    this._likes = likes;
    this._isOwner = ownerID === cardOwnerID;
    this.cardID = cardID;
    this.cardDeleteCardHandler = cardDeleteCardHandler;
    this.cardDeleteLikeHandler = cardDeleteLikeHandler;
    this.cardAddLikeHandler = cardAddLikeHandler;
  }

  createCard(profileID, openPopupCallback) {
    const template = document.querySelector(this._templateSelector).content;
    const cardElement = template.querySelector(".element").cloneNode(true);
    const elementPhoto = cardElement.querySelector(".element__photo");
    let removeButton = null;
    if (this._isOwner) {
      removeButton = document.createElement("button");
      removeButton.classList.add("element__delete");
      cardElement.prepend(removeButton);
    }
    cardElement.querySelector(".element__title").textContent = this._name;
    elementPhoto.src = this._link;
    elementPhoto.alt = this._name;
    cardElement.querySelector(".element__smiley-numbers").textContent =
      this._likesCount;
    this.isLiked = this._isCardLiked(profileID);
    if (this.isLiked)
      this._toggleLike(cardElement.querySelector(".element__smiley"));
    this.cardElement = cardElement;
    this._setEventListener(
      {
        cardDeleteCardHandler: this.cardDeleteCardHandler,
        cardDeleteLikeHandler: this.cardDeleteLikeHandler,
        cardAddLikeHandler: this.cardAddLikeHandler,
      },
      cardElement,
      elementPhoto,
      removeButton,
      openPopupCallback
    );
    return this.cardElement;
  }

  deleteCard() {
    this.cardElement.remove();
  }

  _isCardLiked(profileID) {
    let isLiked = false;
    this._likes.forEach((item) => {
      if (item._id === profileID) isLiked = true;
    });
    return isLiked;
  }

  _toggleLike(element) {
    element.classList.toggle("element__smiley_black");
  }

  incLike() {
    this._toggleLike(this.cardElement.querySelector(".element__smiley"));
    this._likesCount++;
    this.cardElement.querySelector(".element__smiley-numbers").textContent =
      this._likesCount;
    this.isLiked = true;
  }

  decLike() {
    this._toggleLike(this.cardElement.querySelector(".element__smiley"));
    this._likesCount--;
    this.cardElement.querySelector(".element__smiley-numbers").textContent =
      this._likesCount;
    this.isLiked = false;
  }

  _setEventListener(
    { cardDeleteCardHandler, cardDeleteLikeHandler, cardAddLikeHandler },
    cardElement,
    elementPhoto,
    removeButton = null,
    openPopupCallback
  ) {
    if (removeButton)
      removeButton.addEventListener("click", (evt) => {
        cardDeleteCardHandler(this, evt);
      });

    elementPhoto.addEventListener("click", () => {
      openPopupCallback(this._link, this._name);
    });
    cardElement
      .querySelector(".element__smiley")
      .addEventListener("click", (evt) => {
        console.log(this.isLiked);
        if (this.isLiked) {
          cardDeleteLikeHandler(this, evt);
        } else {
          cardAddLikeHandler(this, evt);
          console.log(this);
        }
      });
  }
}

export { Card };
