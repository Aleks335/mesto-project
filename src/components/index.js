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
  popupNameInput,
  popupInputJob,
  formsSelectors,
  popupImageUrl,
  popupImageName,
} from "./constants";

const cardDeleteCardHandler = (card) => {
  api
    .deleteCard(card.cardID)
    .then(() => {
      card.deleteCard();
    })
    .catch((error) => {
      console.log(error);
    });
};

const cardDeleteLikeHandler = (card) => {
  api
    .deleteLike(card.cardID)
    .then(() => {
      card.decLike();
    })
    .catch((error) => {
      console.log(error);
    });
};

const cardAddLikeHandler = (card) => {
  api
    .addLike(card.cardID)
    .then(() => {
      card.incLike();
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

///
function createNewCard(item, profileId) {
  const card = new Card(
    item.name,
    item.link,
    "#element",
    item.likes,
    profileId,
    item._id,
    item.owner._id,
    { cardDeleteCardHandler, cardDeleteLikeHandler, cardAddLikeHandler }
  );

  return card.createCard((src, text) => {
    imagePopupSpecimen.open(src, text);
  });
}
// Отрисовка карточек//
Promise.all([api.fetchProfile(), api.fetchCards()])
  .then((result) => {
    userInfo.setUserInfo({ name: result[0].name, about: result[0].about });
    userInfo.setUserAvatar({ avatar: result[0].avatar });
    cardsSection = new Section(
      {
        items: result[1],
        render: function (item) {
          cardsSection.appendItem(createNewCard(item, result[0]._id));
        },
      },
      ".elements"
    );

    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

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
    const info = userInfo.getUserInfo();
    popupNameInput.value = info.name;
    popupInputJob.value = info.about;
  }
);

const cardPopupSpecimen = new PopupWithForm(".popup_card", (obj) => {
  api
    .createCardRequest(obj)
    .then((result) => {
      cardsSection.prependItem(createNewCard(result, result.owner._id));
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
  profileFormValidation.hideErrors();
  profileFormValidation.disableButton();
});

buttonOpenCard.addEventListener("click", () => {
  cardPopupSpecimen.open();
  cardFormValidation.hideErrors();
  cardFormValidation.disableButton();
});

buttonEditAvatar.addEventListener("click", () => {
  avatarPopupSpecimen.open();
  avatarFormValidation.hideErrors();
  avatarFormValidation.disableButton();
});

// imagePopup

const imagePopupSpecimen = new PopupWithImage(
  ".popup_img",
  popupImageUrl,
  popupImageName
);
imagePopupSpecimen.setEventListeners();
