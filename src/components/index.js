'use strict'//Строгий режим

import '../pages/index.css' //подключаем css
import {Card} from "./Card";
import {closePopup, openPopup,} from "./modal";
import {cardForm} from "./utils";
import {enableValidation} from "./validate";
import {createCardRequest, fetchCards, fetchProfile, updateAvatar, updateProfile} from "./API";

let profileID = null;
const editProfileForm = document.querySelector('.popup__form-edit');
const editNameProfile = document.querySelector('#profile__info-name');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-lob');
const editAboutProfile = document.querySelector('#profile__info-job');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const editProfile = document.querySelector('.profile__edit');
const openCardProfile = document.querySelector('.profile__add-button');
const inputName = cardForm.querySelector('.popup__input_name');
const inputUrl = cardForm.querySelector('.popup__input_url');
const sectionElements = document.querySelector('.elements');
const closeButtons = document.querySelectorAll('.popup__close-min');
const buttonDisabledCard = document.querySelector('#popup__button_card');
const buttonDisabledProfile = document.querySelector('#popup__button_profile');
const buttonDisabledAvatar = document.querySelector('#popup__button_avatar');
const profileAvatar = document.querySelector('.profile__content')
const popupAvatar = document.querySelector('#popup_avatar');
const avatarForm = document.querySelector('.popup__form_avatar');
const inputAvatar = document.querySelector('.popup__input_avatar');


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
        case "avatar":
            buttonDisabledAvatar.classList.add('popup__button-disabled');
            buttonDisabledAvatar.setAttribute("disabled", true);
            avatarForm.reset();
            break;
    }

}

closeButtons.forEach((item) => {
    item.addEventListener('click', () => findAndClosePopup(item.closest('.popup')));
});

fetchProfile().then((result) => {
    profileID = result._id;
    renderProfile(result);
}).then(() => {
    fetchCards().then((result) => {
        console.log(result);
        result.forEach((item) => {
            const cardElement = new Card(item.name, item.link, '#element', item.likes.length,
                item.owner._id === profileID, item._id, isCardLiked(item.likes));
            sectionElements.append(cardElement.cardElement);
        });
    })
});

function isCardLiked(likes) {
    let isLiked = false;
    likes.forEach((item) => {
        if (item._id === profileID)
            isLiked = true
    })
    return isLiked;
}

function renderProfile(profileObject) {
    profileAvatar.style.backgroundImage = `url(${profileObject.avatar})`;
    profileName.textContent = profileObject.name;
    profileJob.textContent = profileObject.about;
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
        createCardRequest(inputName.value, inputUrl.value).then((result) => {
            const cardElement = new Card(result.name, result.link, '#element', result.likes.length,
                result.owner._id === profileID, result.owner._id, isCardLiked(result.likes));
            sectionElements.prepend(cardElement.cardElement);
            findAndClosePopup(popup);
        })
    }
}

function handleProfileEditFormSubmit(evt, popup) {
    evt.preventDefault();
    updateProfile(editNameProfile.value, editAboutProfile.value)
        .then((result) => {
            renderProfile(result);
            findAndClosePopup(popup);
        }).catch((error) => {
        console.log(error)
    });
}

function handleAvatarEditFormSubmit(evt, popup) {
    evt.preventDefault();
    updateAvatar(inputAvatar.value)
        .then((result) => {
            console.log(result)
            renderProfile(result);
            findAndClosePopup(popup);
        }).catch((error) => {
        console.log(error)
    });
}

Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            findAndClosePopup(popup)
        }
    })
})


cardForm.addEventListener('submit', (e) => handleCardFormSubmit(e, popupCard));

editProfileForm.addEventListener('submit', (e) => handleProfileEditFormSubmit(e, popupProfile));

avatarForm.addEventListener('submit', (e) => handleAvatarEditFormSubmit(e, popupAvatar));


editProfile.addEventListener('click', () => {
    editNameProfile.value = profileName.textContent;
    editAboutProfile.value = profileJob.textContent;
    openPopup(popupProfile);
});

openCardProfile.addEventListener('click', () => openPopup(popupCard));

profileAvatar.addEventListener('click', () => openPopup(popupAvatar));

export {
    enableValidation,
}