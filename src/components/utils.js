const cardForm = document.querySelector('.popup__form_card');
const editProfileForm = document.querySelector('.popup__form-edit');
const inputProfileForm = document.querySelector('#profile__info-name');
const profileName = document.querySelector('.profile__info-name');
const profileJob = document.querySelector('.profile__info-lob');
const inputAboutProfile = document.querySelector('#profile__info-job');
const popupCard = document.querySelector('.popup_card');
const popupProfile = document.querySelector('.popup_profile');
const buttonEditProfile = document.querySelector('.profile__edit');
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

export {
    cardForm,
    editProfileForm,
    inputProfileForm,
    profileName,
    profileJob,
    inputAboutProfile,
    popupCard,
    popupProfile,
    buttonEditProfile,
    openCardProfile,
    inputName,
    inputUrl,
    sectionElements,
    closeButtons,
    buttonDisabledCard,
    buttonDisabledProfile,
    buttonDisabledAvatar,
    profileAvatar,
    popupAvatar,
    avatarForm,
    inputAvatar,
}
