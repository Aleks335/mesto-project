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
        let isMine = item.owner._id == result[0]._id;
        let cardConstruct = new Card(item.name, item.link, "#element", item.likes, isMine, item._id);
        let card = cardConstruct.createCard({
            cardDeleteCardHandler,
            cardAddLikeHandler,
            cardDeleteLikeHandler
        }, result[0]._id, (src, text)=>{imagePopupSpecimen.open(src, text)})
        cardsSection.appendItem(card)
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


function PopupValidation(form) {
const profilePopupValidation = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_execute',
    spanError: '-error',
}, form)
    profilePopupValidation.validateForm();
}

const cardPopupSpecimen = new PopupWithForm('.popup_card', ()=>{api.createCardRequest.call(api, inputCardName.value, inputCardUrl.value)}, hideError);


const avatarPopupSpecimen = new PopupWithForm('.popup_avatar', ()=>{api.updateAvatar.call(api, inputAvatarUrl.value)}, hideError);


  profilePopupSpecimen.setEventListeners();
  cardPopupSpecimen.setEventListeners();
  avatarPopupSpecimen.setEventListeners();


///nem
  buttonEditProfile.addEventListener("click", ()=>{
      profilePopupSpecimen.open();
      PopupValidation(formEditProfile);
  });

  buttonOpenCard.addEventListener("click", ()=>{
      cardPopupSpecimen.open();
      PopupValidation(formCard);
  });

  buttonEditAvatar.addEventListener('click',()=>{
      avatarPopupSpecimen.open();
      PopupValidation(formAvatar);
  })


  // imagePopup

  const imagePopupSpecimen = new PopupWithImage(".popup_img")
  imagePopupSpecimen.setEventListeners();

