const formCard = document.querySelector('.popup__form_card');
const formEditProfile = document.querySelector('.popup__form-edit');
const inputProfileForm = document.querySelector('#profile__info-name');
const textProfileName = document.querySelector('.profile__info-name');
const textProfileJob = document.querySelector('.profile__info-lob');
const inputProfileAbout = document.querySelector('#profile__info-job');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const buttonEditProfile = document.querySelector('.profile__edit');
const buttonOpenCard = document.querySelector('.profile__add-button');
const inputCardName = formCard.querySelector('.popup__input_name');
const inputCardUrl = formCard.querySelector('.popup__input_url');
const sectionElements = document.querySelector('.elements');
const buttonsCloseForm = document.querySelectorAll('.popup__close-min');
const buttonSubmitCard = document.querySelector('#popup__button_card');
const buttonSubmitProfile = document.querySelector('#popup__button_profile');
const buttonSubmitAvatar = document.querySelector('#popup__button_avatar');
const buttonEditAvatar = document.querySelector('.profile__content');
const popupAvatar = document.querySelector('#popup_avatar');
const formAvatar = document.querySelector('.popup__form_avatar');
const inputAvatarUrl = document.querySelector('.popup__input_avatar');
const popupImageUrl = document.querySelector('.popup__image-url');
const popupImageName = document.querySelector('.popup__image-name')

export {
    formCard,
    formEditProfile,
    inputProfileForm,
    textProfileName,
    textProfileJob,
    inputProfileAbout,
    popupCard,
    popupProfile,
    buttonEditProfile,
    buttonOpenCard,
    inputCardName,
    inputCardUrl,
    sectionElements,
    buttonsCloseForm,
    buttonSubmitCard,
    buttonSubmitProfile,
    buttonSubmitAvatar,
    buttonEditAvatar,
    popupAvatar,
    formAvatar,
    inputAvatarUrl,
    popupImageUrl,
    popupImageName
}
