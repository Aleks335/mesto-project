'use strict'//Строгий режим

const popupButtonProfile = document.querySelector('.popup__button');
const formElementProfile = document.querySelector('.popup__form');
const editProfile = document.querySelector('.profile__edit');
const closeProfile = document.querySelector('.popup__close');
const popupProfile= document.getElementById('popup_profile');
const openCardProfile = document.querySelector('.profile__add-button');

const nameInputProfile = document.querySelector('.popup__input_str_name');
const jobInputProfile = document.querySelector('.popup__input_str_jop');
const userNameProfile = document.querySelector('.profile__info-name');
const userJopProfile = document.querySelector('.profile__info-lob');

//Карточки элемент
const sectionElements = document.querySelector('.elements');

// Массив для карт
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// popup_img
const popupImg = document.getElementById('popup_img')

// Card
const popupCard = document.getElementById('popup_card');
const closeCard = document.getElementById('popup__close_card');
const ButtonCard = document.getElementById('popup__button-card')


// function popup Profile
function openProfileForm(){
    popupProfile.classList.add('open__popup');
    nameInputProfile.value = userNameProfile.textContent;
    jobInputProfile.value = userJopProfile.textContent;
}
function closePopupProfile() {
    popupProfile.classList.remove('open__popup');
}
function formSubmitHandler (evt) {
    evt.preventDefault();// Эта строчка отменяет стандартную отправку формы.
    userNameProfile.textContent = nameInputProfile.value;
    userJopProfile.textContent=jobInputProfile.value;
    closePopupProfile();
}
function openCardForm(){
    popupCard.classList.add('open__popup');
}
function closePopupCard() {
    popupCard.classList.remove('open__popup');
}
function closePopupImg() {
    popupImg.classList.remove('open__popup');
}

// создание карточек
function cardsCreate(link, name) {
    const template = document.querySelector('#element').content;
    const cardsElement = template.querySelector('.element').cloneNode(true);
    cardsElement.querySelector('.element__photo').src = link;
    cardsElement.querySelector('.element__photo').alt = name;
    cardsElement.querySelector('.element__title').textContent = name;

    //лайк
    cardsElement.querySelector('.element__smiley').addEventListener('click', function(evt) {
        evt.target.classList.toggle('element__smiley_black');
    })

    //удаление
    cardsElement.querySelector('.element__delete').addEventListener('click', function(evt) {
        evt.target.closest('.element').remove();
    })

    // открытие popup с фото
    cardsElement.querySelector('.element__photo').addEventListener('click', function() {
        popupImg.classList.add('open__popup');
        popupImg.querySelector('.popup__image-url').src = link;
        popupImg.querySelector('.popup__image-url').alt = name;
        popupImg.querySelector('.popup__image-name').textContent = name;
    })

    //  закрытие через popup
    popupImg.querySelector('.popup__close-min').addEventListener('click', closePopupImg);
    return cardsElement;
}
function cardsDisplay(initialCards) {
    initialCards.forEach((i) =>{
        sectionElements.append(cardsCreate(i.link, i.name) );
    })
}
cardsDisplay(initialCards);


ButtonCard.addEventListener("click", function (evt) {
    evt.preventDefault();//
    const cardForm = document.querySelector('.popup__form_card');
    const inputName = cardForm.querySelector('.popup__input_name').cloneNode(true);
    const inputUrl = cardForm.querySelector('.popup__input_url').cloneNode(true);
    if ((inputName.value.length > 0) && (inputUrl.value.length > 0)){
        sectionElements.prepend(cardsCreate(inputUrl.value, inputName.value));
        //closePopupCard();
    }

})



formElementProfile.addEventListener('submit', formSubmitHandler);
popupButtonProfile.addEventListener('click', formSubmitHandler);

editProfile.addEventListener('click', openProfileForm);
closeProfile.addEventListener('click', closePopupProfile);
openCardProfile.addEventListener('click', openCardForm);
closeCard.addEventListener('click', closePopupCard);
