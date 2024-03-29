'use strict'//Строгий режим

import '../pages/index.css' //подключаем css
import {Card} from "./Card";
import {closePopup, openPopup,} from "./modal";
import {
    buttonEditAvatar,
    buttonEditProfile,
    buttonOpenCard,
    buttonsCloseForm,
    buttonSubmitAvatar,
    buttonSubmitCard,
    buttonSubmitProfile,
    formAvatar,
    formCard,
    formEditProfile,
    inputAvatarUrl,
    inputCardName,
    inputCardUrl,
    inputProfileAbout,
    inputProfileForm,
    popupAvatar,
    popupCard,
    popupProfile,
    sectionElements,
    textProfileJob,
    textProfileName,
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
            buttonSubmitProfile.classList.add('popup__button-disabled');
            buttonSubmitProfile.setAttribute("disabled", true);
            break;
        case "card":
            buttonSubmitCard.classList.add('popup__button-disabled');
            buttonSubmitCard.setAttribute("disabled", true);
            formCard.reset();
            break;
        case "avatar":
            buttonSubmitAvatar.classList.add('popup__button-disabled');
            buttonSubmitAvatar.setAttribute("disabled", true);
            formAvatar.reset();
            break;
    }
}

buttonsCloseForm.forEach((item) => {
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


function createCardObj(item) {
    const cardHandlers = {
        cardAddLikeHandler,
        cardDeleteLikeHandler,
        cardDeleteCardHandler
    }
    const cardElement = new Card(item.name, item.link, '#element', item.likes,
        item.owner._id === profileID, item._id);
    return cardElement.createCard(cardHandlers, profileID);
}


fetchProfile().then((result) => {
    profileID = result._id;
    renderProfile(result);
}).then(() => {
    fetchCards().then((result) => {
        result.forEach((item) => {
            sectionElements.append(createCardObj(item));
        });
    })
}).catch((error) => {
    console.log(error);
});



function renderProfile(profileObject) {
    buttonEditAvatar.style.backgroundImage = `url(${profileObject.avatar})`;
    textProfileName.textContent = profileObject.name;
    textProfileJob.textContent = profileObject.about;
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
    if ((inputCardName.value.length > 0) && (inputCardUrl.value.length > 0)) {
        buttonSubmitCard.textContent = 'Сохранение...';
        createCardRequest(inputCardName.value, inputCardUrl.value).then((result) => {
            sectionElements.prepend(createCardObj(result));
            findAndClosePopup(popup);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            buttonSubmitCard.textContent = 'Создать';
        })
    }
}

function handleProfileEditFormSubmit(evt, popup) {
    evt.preventDefault();
    buttonSubmitProfile.textContent = 'Сохранение...';
    updateProfile(inputProfileForm.value, inputProfileAbout.value)
        .then((result) => {
            renderProfile(result);
            findAndClosePopup(popup);
        }).catch((error) => {
        console.log(error)
    }).finally(() => {
        buttonSubmitProfile.textContent = 'Сохранить';
    });
}

function handleAvatarEditFormSubmit(evt, popup) {
    evt.preventDefault();
    buttonSubmitAvatar.textContent = 'Сохранение...';
    updateAvatar(inputAvatarUrl.value)
        .then((result) => {
            console.log(result)
            renderProfile(result);
            findAndClosePopup(popup);
        }).catch((error) => {
        console.log(error)
    }).finally(() => {
        buttonSubmitAvatar.textContent = 'Создать';
    });
}

Array.from(document.querySelectorAll('.popup')).forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            findAndClosePopup(popup)
        }
    })
})


formCard.addEventListener('submit', (e) => handleCardFormSubmit(e, popupCard));

formEditProfile.addEventListener('submit', (e) => handleProfileEditFormSubmit(e, popupProfile));

formAvatar.addEventListener('submit', (e) => handleAvatarEditFormSubmit(e, popupAvatar));


buttonEditProfile.addEventListener('click', () => {
    inputProfileForm.value = textProfileName.textContent;
    inputProfileAbout.value = textProfileJob.textContent;
    openPopup(popupProfile);
});

buttonOpenCard.addEventListener('click', () => openPopup(popupCard));

buttonEditAvatar.addEventListener('click', () => openPopup(popupAvatar));

export {
    enableValidation,
}