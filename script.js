'use strict'//Строгий режим

const formElementProfile = document.querySelector('.popup__form');
const editProfile = document.querySelector('.profile__edit');
const closeProfile = document.querySelector('.popup__close');
const popupProfile = document.querySelector('.popup_profile');
const openCardProfile = document.querySelector('.profile__add-button');

const nameInputProfile = document.querySelector('.popup__input_str_name');
const jobInputProfile = document.querySelector('.popup__input_str_jop');
const userNameProfile = document.querySelector('.profile__info-name');
const userJopProfile = document.querySelector('.profile__info-lob');

//Карточки элемент
const sectionElements = document.querySelector('.elements');

// popup_img
const popupImg = document.querySelector('.popup_img')
const popupCloseButton=popupImg.querySelector('.popup__close-min')

// Card
const popupCard = document.querySelector('.popup_card');
const closeCard = document.querySelector('.popup__close_card');

const cardForm = document.querySelector('.popup__form_card');
const inputName = cardForm.querySelector('.popup__input_name');
const inputUrl = cardForm.querySelector('.popup__input_url');
const popupImageUrl = popupImg.querySelector('.popup__image-url');
const template = document.querySelector('#element').content;


// function popup Profile
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('mousedown', inputEnter);
    document.addEventListener('keydown', inputEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function inputEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        cardForm.reset();
        closePopup(openedPopup);
    }
}

function inputEnter(evt) {
    if (evt.key === 'Enter') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openProfileForm() {
    openPopup(popupProfile);
    nameInputProfile.value = userNameProfile.textContent;
    jobInputProfile.value = userJopProfile.textContent;
}

function closePopupProfile() {
    closePopup(popupProfile);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
    userNameProfile.textContent = nameInputProfile.value;
    userJopProfile.textContent = jobInputProfile.value;
    closePopupProfile();
}

function openCardForm() {
    openPopup(popupCard);
}

function closePopupCard() {
    closePopup(popupCard);
    cardForm.reset();
}

function closePopupButton() {
    closePopup(popupImg);
}

// создание карточек
function createCard(link, name) {
    const cardsElement = template.querySelector('.element').cloneNode(true);
    const cardsPhoto = cardsElement.querySelector('.element__photo');
    cardsPhoto.src = link;
    cardsPhoto.alt = name;
    cardsElement.querySelector('.element__title').textContent = name;

    //лайк
    cardsElement.querySelector('.element__smiley').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__smiley_black');
    })

    //удаление
    cardsElement.querySelector('.element__delete').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    })

    // открытие popup с фото
    cardsElement.querySelector('.element__photo').addEventListener('click', function () {
        openPopup(popupImg);
        popupImageUrl.src = link;
        popupImageUrl.alt = name;
        popupImg.querySelector('.popup__image-name').textContent = name;
    })
    return cardsElement;
}

function cardsDisplay(initialCards) {
    initialCards.forEach((i) => {
        sectionElements.append(createCard(i.link, i.name));
    })
}

cardsDisplay(initialCards);

function handleCardFormSubmit(evt) {
    evt.preventDefault();//
    if ((inputName.value.length > 0) && (inputUrl.value.length > 0)) {
        sectionElements.prepend(createCard(inputUrl.value, inputName.value));
        closePopupCard();
        cardForm.reset();
    }
}

popupCloseButton.addEventListener('click', closePopupButton);
cardForm.addEventListener('submit', handleCardFormSubmit);
formElementProfile.addEventListener('submit', handleProfileFormSubmit);
closeProfile.addEventListener('click', closePopupProfile);
closeCard.addEventListener('click', closePopupCard);
editProfile.addEventListener('click', openProfileForm);
openCardProfile.addEventListener('click', openCardForm)