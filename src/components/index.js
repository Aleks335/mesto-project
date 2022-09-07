import '../pages/index.css' //подключаем css
import {Card} from "./Card";
import {closePopup, openPopup,} from "./modal";
import {cardForm} from "./utils";
import {enableValidation} from "./validate";

const userNameProfile = document.querySelector('.profile__info-name');
const nameInputProfile = document.querySelector('.popup__input_str_name');
const userJopProfile = document.querySelector('.profile__info-lob');
const jobInputProfile = document.querySelector('.popup__input_str_jop');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const formElementProfile = document.querySelector('.popup__form');
const editProfile = document.querySelector('.profile__edit');
const openCardProfile = document.querySelector('.profile__add-button');
const inputName = cardForm.querySelector('.popup__input_name');
const inputUrl = cardForm.querySelector('.popup__input_url');
const sectionElements = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-min');
const buttonDisabledCard = document.querySelector('#popup__button_card');
const buttonDisabledProfile = document.querySelector('#popup__button_profile');
const profileAvatar = document.querySelector('.profile__content')
const popupAvatar = document.querySelector('#popup_avatar');

function findAndClosePopup(popup) {
    closePopup(popup);
    switch (popup.dataset.type) {
        case "profile":
            buttonDisabledProfile.classList.add('popup__button-disabled');
            buttonDisabledProfile.setAttribute("disabled", true);
            break;
        case "card":
            buttonDisabledCard.classList.add('popup__button-disabled');
            buttonDisabledCard.setAttribute("disabled", true);
            cardForm.reset();
            break;
    }

}

closeButtons.forEach((item) => {
    item.addEventListener('click', () => findAndClosePopup(item.closest('.popup')));
});

'use strict'//Строгий режим
// Массив для карт
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach((item) => {
    const cardElement = createCard(item.link, item.name)
    sectionElements.append(cardElement);
})

function createCard(url, name) {
    const card = new Card(name, url, '#element');
    return card.cardElement;
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_execute',
    spanError: '-error',
});

function handleCardFormSubmit(evt, popup) {
    evt.preventDefault();//
    if ((inputName.value.length > 0) && (inputUrl.value.length > 0)) {
        sectionElements.prepend(createCard(inputUrl.value, inputName.value));
        findAndClosePopup(popup);
    }
}

function handleProfileFormSubmit(evt, popup) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
    userNameProfile.textContent = nameInputProfile.value;
    userJopProfile.textContent = jobInputProfile.value;
    findAndClosePopup(popup);
}

function handleAvatarFormSubmit(evt, popup) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
    if ((inputName.value.length > 0) && (inputUrl.value.length > 0)) {
        sectionElements.prepend(createCard(inputUrl.value, inputName.value));
        findAndClosePopup(popup);
    }
}



Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            findAndClosePopup(popup)
        }
    })
})


// profileAvatar.addEventListener('submit', (e) => handleAvatarFormSubmit(e, popupAvatar));
// profileAvatar.addEventListener('submit', function (){
//     console.log('hhhhhhh');
// });


cardForm.addEventListener('submit', (e) => handleCardFormSubmit(e, popupCard));
formElementProfile.addEventListener('submit', (e) => handleProfileFormSubmit(e, popupProfile));

editProfile.addEventListener('click', () => {
    nameInputProfile.value = userNameProfile.textContent;
    jobInputProfile.value = userJopProfile.textContent;
    openPopup(popupProfile);
});

openCardProfile.addEventListener('click', () => openPopup(popupCard));

profileAvatar.addEventListener('click', () => openPopup(popupAvatar));

profileAvatar.addEventListener('click', function () {
    return fetch('https://nomoreparties.co/v1/plus-cohort-14/cards', {
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
        });
});


export {
    initialCards,
    enableValidation,
}