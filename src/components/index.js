'use strict'//Строгий режим

import '../pages/index.css' //подключаем css
import {Card} from "./Card";
import {PopupWithForm} from "./PopupWithForm";
import {PopupWithImage} from "./PopupWithImage";
import {FormValidator} from "./FormValidator";
import {Api} from "./API";
import {UserInfo} from "./UserInfo";
import {Section} from "./Section";

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
    popupNameInput,
    popupInputJob
} from "./utils";
import {buttons} from "../utils/constants";

function hideError(input){
    setTimeout(()=>{
        const spanError = document.querySelector("#" + input.id + "-error");
          spanError.textContent = "";
          spanError.classList.remove(this.errorClass);
          spanError.textContent = "";
    },500)
  }
// Ниже перенести в API 
const cardDeleteCardHandler = (card, evt) => {
    api.deleteCard(card._cardID).then(() => {
        evt.target.closest('.element').remove();
    }).catch((error) => {
        console.log(error);
    })
};

const cardDeleteLikeHandler = (card, evt) => {
    api.deleteLike(card._cardID).then(() => {
        card.decLike(evt);
    }).catch((error) => {
        console.log(error);
    })
};

const cardAddLikeHandler = (card, evt) => {
    api.addLike(card._cardID).then(() => {
        card.incLike(evt);
    }).catch((error) => {
        console.log(error);
    })
}; 

// Выше перенести в Api

const api = new Api({authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8", baseUrl: "https://nomoreparties.co/v1/plus-cohort-16"});
const userInfo = new UserInfo({profileTitle: ".profile__info-name", profileJob: ".profile__info-lob", profileAvatar: ".profile__content"})
let cardsSection;


// Отрисовка карточек//
Promise.all([api.fetchProfile(), api.fetchCards()]).then((result)=>{
    userInfo.setUserInfo({name: result[0].name, about: result[0].about})
    userInfo.setUserAvatar({avatar: result[0].avatar})
    cardsSection = new Section({items: result[1], render: function(item){
        let cardConstruct = new Card(item.name, item.link, "#element", item.likes, false, item._id);
        let card = cardConstruct.createCard({
            cardDeleteCardHandler,
            cardAddLikeHandler,
            cardDeleteLikeHandler
        }, result[0]._id, (src, text)=>{imagePopupSpecimen.open(src, text)})
        cardsSection.addItem(card)
    }}, ".elements")

    cardsSection.renderItems()
})

// Форма изменения данных профиля//

// const userInfo = new UserInfo(".profile__info-name",".profile__info-lob","profile__content")

const profilePopupSpecimen = new PopupWithForm(".popup_profile", ()=>{
    api.updateProfile.call(api, popupNameInput.value, popupInputJob.value).then((result)=>{
    userInfo.setUserInfo(result)
    profilePopupSpecimen.close();
})
}, hideError, 
()=>{
    let info = userInfo.getUserInfo();
    popupNameInput.value = info.name;
    popupInputJob.value = info.about;
})

const profilePopupValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_execute',
    spanError: '-error',
}, formEditProfile)
    profilePopupValidation.validateForm();

const CardPopupSpecimen = new PopupWithForm('.popup_card', ()=>{api.createCardRequest.call(api, inputCardName.value, inputCardUrl.value)}, hideError);

const AvatarPopupSpecimen = new PopupWithForm('.popup_avatar', ()=>{api.updateAvatar.call(api, inputAvatarUrl.value)}, hideError);

  profilePopupSpecimen.setEventListeners()

  buttonEditProfile.addEventListener("click", ()=>{profilePopupSpecimen.open()});

  buttonOpenCard.addEventListener("click", ()=>{CardPopupSpecimen.open()});

  buttonEditAvatar.addEventListener('click',()=>{AvatarPopupSpecimen.open()})


  // imagePopup

  const imagePopupSpecimen = new PopupWithImage(".popup_img")

  imagePopupSpecimen.setEventListeners();


/*let profileID = null;
///// пока просто вызвал
const profileInfo = new UserInfo (constant.selectors);
///

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
} */