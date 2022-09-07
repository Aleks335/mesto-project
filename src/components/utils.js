const cardForm = document.querySelector('.popup__form_card');

const apiConfig = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-14/cards',
    headers: {
        authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f',
        "Content-Type": "application/json"
    }
}

export {
    apiConfig,
    cardForm,
}
