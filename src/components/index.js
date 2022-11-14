"use strict"; //Строгий режим

import "../pages/index.css"; //подключаем css
import { Card } from "./Card";
import { PopupWithForm } from "./PopupWithForm";
import { PopupWithImage } from "./PopupWithImage";
import { FormValidator } from "./FormValidator";
import { Api } from "./API";
import { UserInfo } from "./UserInfo";
import { Section } from "./Section";

import {
  buttonEditAvatar,
  buttonEditProfile,
  buttonOpenCard,
  formAvatar,
  formCard,
  formEditProfile,
  inputAvatarUrl,
  inputCardName,
  inputCardUrl,
  popupNameInput,
  popupInputJob,
  formsSelectors,
  popupImageUrl,
  popupImageName,
} from "./constants";

const cardDeleteCardHandler = (card, evt) => {
  api
    .deleteCard(card.cardID)
    .then(() => {
      evt.target.closest(".element").remove();
    })
    .catch((error) => {
      console.log(error);
    });
};

const cardDeleteLikeHandler = (card, evt) => {
  api
    .deleteLike(card.cardID)
    .then(() => {
      card.decLike(evt);
    })
    .catch((error) => {
      console.log(error);
    });
};

const cardAddLikeHandler = (card, evt) => {
  api
    .addLike(card.cardID)
    .then(() => {
      card.incLike(evt);
    })
    .catch((error) => {
      console.log(error);
    });
};

const api = new Api({
  authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
});
const userInfo = new UserInfo({
  profileTitle: ".profile__info-name",
  profileJob: ".profile__info-lob",
  profileAvatar: ".profile__content",
});
let cardsSection;

// Отрисовка карточек//
Promise.all([api.fetchProfile(), api.fetchCards()])
  .then((result) => {
    userInfo.setUserInfo({ name: result[0].name, about: result[0].about });
    userInfo.setUserAvatar({ avatar: result[0].avatar });
    cardsSection = new Section(
      {
        items: result[1],
        render: function (item) {
          const isMine = item.owner._id == result[0]._id;
          const cardConstruct = new Card(
            item.name,
            item.link,
            "#element",
            item.likes,
            isMine,
            item._id
          );
          const card = cardConstruct.createCard(
            {
              cardDeleteCardHandler,
              cardAddLikeHandler,
              cardDeleteLikeHandler,
            },
            result[0]._id,
            (src, text) => {
              imagePopupSpecimen.open(src, text);
            }
          );
          cardsSection.appendItem(card);
        },
      },
      ".elements"
    );

    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

// Форма изменения данных профиля//

// const userInfo = new UserInfo(".profile__info-name",".profile__info-lob","profile__content")

const profilePopupSpecimen = new PopupWithForm(
  ".popup_profile",
  (obj) => {
    api
      .updateProfile(obj)
      .then((result) => {
        userInfo.setUserInfo(result);
        profilePopupSpecimen.close();
      })
      .catch((err) => console.log(err))
      .finally(() => profilePopupSpecimen.setButtonCompleteState());
  },
  () => {
    let info = userInfo.getUserInfo();
    popupNameInput.value = info.name;
    popupInputJob.value = info.about;
  }
);

const cardPopupSpecimen = new PopupWithForm(".popup_card", (obj) => {
  api
    .createCardRequest(obj)
    .then((result) => {
      const cardConstruct = new Card(
        result.name,
        result.link,
        "#element",
        result.likes,
        true,
        result._id
      );
      const card = cardConstruct.createCard(
        {
          cardDeleteCardHandler,
          cardAddLikeHandler,
          cardDeleteLikeHandler,
        },
        result.owner._id,
        (src, text) => {
          imagePopupSpecimen.open(src, text);
        }
      );
      cardsSection.prependItem(card);
      cardPopupSpecimen.close();
    })
    .catch((err) => console.log(err))
    .finally(() => cardPopupSpecimen.setButtonCompleteState());
});

const avatarPopupSpecimen = new PopupWithForm(".popup_avatar", (obj) => {
  api
    .updateAvatar(obj)
    .then((result) => {
      userInfo.setUserAvatar({ avatar: result.avatar });
      avatarPopupSpecimen.close();
    })
    .catch((err) => console.log(err))
    .finally(() => avatarPopupSpecimen.setButtonCompleteState());
});

profilePopupSpecimen.setEventListeners();
cardPopupSpecimen.setEventListeners();
avatarPopupSpecimen.setEventListeners();

const profileFormValidation = new FormValidator(
  formsSelectors,
  formEditProfile
);
const cardFormValidation = new FormValidator(formsSelectors, formCard);
const avatarFormValidation = new FormValidator(formsSelectors, formAvatar);

profileFormValidation.validateForm();
cardFormValidation.validateForm();
avatarFormValidation.validateForm();

///nem
buttonEditProfile.addEventListener("click", () => {
  profilePopupSpecimen.open();
  profilePopupSpecimen.hideErrors();
  profileFormValidation.disableButton();
});

buttonOpenCard.addEventListener("click", () => {
  cardPopupSpecimen.open();
  cardPopupSpecimen.hideErrors();
  cardFormValidation.disableButton();
});

buttonEditAvatar.addEventListener("click", () => {
  avatarPopupSpecimen.open();
  avatarPopupSpecimen.hideErrors();
  avatarFormValidation.disableButton();
});

// imagePopup

const imagePopupSpecimen = new PopupWithImage(
  ".popup_img",
  popupImageUrl,
  popupImageName
);
imagePopupSpecimen.setEventListeners();
