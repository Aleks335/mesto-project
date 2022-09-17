'use strict'//Строгий режим

import '../pages/index.css' //подключаем css
import {Card} from "./Card";
import {closePopup, openPopup,} from "./modal";
import {
    avatarForm,
    buttonDisabledAvatar,
    buttonDisabledCard,
    buttonDisabledProfile,
    buttonEditProfile,
    cardForm,
    closeButtons,
    editProfileForm,
    inputAboutProfile,
    inputAvatar,
    inputName,
    inputProfileForm,
    inputUrl,
    openCardProfile,
    popupAvatar,
    popupCard,
    popupProfile,
    profileAvatar,
    profileJob,
    profileName,
    sectionElements,
} from "./utils";
import {enableValidation} from "./validate";
import {
    addLike,
    createCardRequest,
    deleteCard,
    deleteLike,
    fetchCards,
    fetchProfile,
    updateAvatar,
    updateProfile,
} from "./API";


let profileID = null;


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
    item.addEventListener('click', () =>
        findAndClosePopup(item.closest('.popup')));
});

const cardDeleteCardHandler = (card, evt) => {
    deleteCard(card.cardID).then(() => {
        evt.target.closest('.element').remove();
    }).catch((error) => {
        console.log(error);
    })
};

const cardDeleteLikeHandler = (card, evt) => {
    deleteLike(card.cardID).then(() => {
        card.decLike(evt);
    }).catch((error) => {
        console.log(error);
    })
};

const cardAddLikeHandler = (card, evt) => {
    addLike(card.cardID).then(() => {
        card.incLike(evt);
    }).catch((error) => {
        console.log(error);
    })
};

const cardHandlers = {
    cardAddLikeHandler,
    cardDeleteLikeHandler,
    cardDeleteCardHandler
}


fetchProfile().then((result) => {
    profileID = result._id;
    renderProfile(result);
}).then(() => {
    fetchCards().then((result) => {
        result.forEach((item) => {
            const cardElement = new Card(item.name, item.link, '#element', item.likes,
                item.owner._id === profileID, item._id);
            cardElement.createCard(cardHandlers, profileID);
            sectionElements.append(cardElement.cardElement);
        });
    })
}).catch((error) => {
    console.log(error);
});



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
        buttonDisabledCard.textContent='Сохранение...';
        createCardRequest(inputName.value, inputUrl.value).then((result) => {
            const cardElement = new Card(result.name, result.link, '#element', result.likes,
                result.owner._id === profileID, result._id);
            cardElement.createCard(cardHandlers, profileID);
            sectionElements.prepend(cardElement.cardElement);
            findAndClosePopup(popup);
            buttonDisabledCard.textContent='Создать';
        })
    }
}

function handleProfileEditFormSubmit(evt, popup) {
    evt.preventDefault();
    buttonDisabledProfile.textContent='Сохранение...';
    updateProfile(inputProfileForm.value, inputAboutProfile.value)
        .then((result) => {
            renderProfile(result);
            findAndClosePopup(popup);
            buttonDisabledProfile.textContent='Сохранить';
        }).catch((error) => {
        console.log(error)
    });
}

function handleAvatarEditFormSubmit(evt, popup) {
    evt.preventDefault();
    buttonDisabledAvatar.textContent='Сохранение...';
    updateAvatar(inputAvatar.value)
        .then((result) => {
            console.log(result)
            renderProfile(result);
            findAndClosePopup(popup);
            buttonDisabledAvatar.textContent='Создать';
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


buttonEditProfile.addEventListener('click', () => {
    inputProfileForm.value = profileName.textContent;
    inputAboutProfile.value = profileJob.textContent;
    openPopup(popupProfile);
});

openCardProfile.addEventListener('click', () => openPopup(popupCard));

profileAvatar.addEventListener('click', () => openPopup(popupAvatar));

export {
    enableValidation,
}