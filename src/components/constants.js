const formCard = document.querySelector(".popup__form_card");
const formEditProfile = document.querySelector(".popup__form-edit");
const imagePopup = document.querySelector(".popup_img");
const buttonEditProfile = document.querySelector(".profile__edit");
const buttonOpenCard = document.querySelector(".profile__add-button");
const inputCardName = formCard.querySelector(".popup__input_name");
const inputCardUrl = formCard.querySelector(".popup__input_url");
const buttonEditAvatar = document.querySelector(".profile__content");
const formAvatar = document.querySelector(".popup__form_avatar");
const inputAvatarUrl = document.querySelector(".popup__input_avatar");
const popupImageUrl = document.querySelector(".popup__image-url");
const popupImageName = document.querySelector(".popup__image-name");
const popupNameInput = document.querySelector(".popup__input_str_name");
const popupInputJob = document.querySelector(".popup__input_str_jop");

const formsSelectors = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button-disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_execute",
  spanError: "-error",
};

export {
  formCard,
  formEditProfile,
  buttonEditProfile,
  buttonOpenCard,
  inputCardName,
  inputCardUrl,
  buttonEditAvatar,
  formAvatar,
  inputAvatarUrl,
  popupImageUrl,
  popupImageName,
  popupNameInput,
  popupInputJob,
  imagePopup,
  formsSelectors,
};