const fetchCards = async () => {
    const request = await fetch('https://mesto.nomoreparties.co/v1/plus-cohort-14/cards', {
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
}

const fetchProfile = async () => {
    const request = await fetch('https://mesto.nomoreparties.co/v1/plus-cohort-14/users/me', {
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
}

const updateProfile = async (newName, newAbout) => {
    const request = await fetch('https://mesto.nomoreparties.co/v1/plus-cohort-14/users/me', {
        method: 'PATCH',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    });
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
}

const createCardRequest = async (name, link) => {
    const request = await fetch('https://mesto.nomoreparties.co/v1/plus-cohort-14/cards', {
        method: 'POST',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    });
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
}

const deleteCard = async (cardId) => {
    const request = await fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
}


const deleteLike = async (cardId) => {
    const request = await fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
}

const addLike = async (cardId) => {
    const request = await fetch(`https://nomoreparties.co/v1/plus-cohort-14/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f'
        }
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
}

const updateAvatar = async (avatar) => {
    const request = await fetch('https://nomoreparties.co/v1/plus-cohort-14/users/me/avatar/', {
        method: 'PATCH',
        headers: {
            authorization: '2ec06afe-eca5-4f7b-b157-153d9348809f',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    if (!request.ok)
        return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
}


export {
    fetchCards,
    fetchProfile,
    updateProfile,
    createCardRequest,
    deleteCard,
    deleteLike,
    addLike,
    updateAvatar
}