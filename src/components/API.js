/*const fetchCards = async () => {
  const request = await fetch(
    "https://mesto.nomoreparties.co/v1/plus-cohort-16/cards",
    {
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
      },
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  return result;
};

const fetchProfile = async () => {
  const request = await fetch(
    "https://mesto.nomoreparties.co/v1/plus-cohort-16/users/me",
    {
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
      },
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  return result;
};

const updateProfile = async (newName, newAbout) => {
  const request = await fetch(
    "https://mesto.nomoreparties.co/v1/plus-cohort-16/users/me",
    {
      method: "PATCH",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  return result;
};

const createCardRequest = async (name, link) => {
  const request = await fetch(
    "https://mesto.nomoreparties.co/v1/plus-cohort-16/cards",
    {
      method: "POST",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
  const result = await request.json();
  return result;
};

const deleteCard = async (cardId) => {
  const request = await fetch(
    `https://nomoreparties.co/v1/plus-cohort-16/cards/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
      },
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  console.log(result);
  return result;
};

const deleteLike = async (cardId) => {
  const request = await fetch(
    `https://nomoreparties.co/v1/plus-cohort-16/cards/likes/${cardId}`,
    {
      method: "DELETE",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
      },
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
  const result = await request.json();
  return result;
};

const addLike = async (cardId) => {
  const request = await fetch(
    `https://nomoreparties.co/v1/plus-cohort-16/cards/likes/${cardId}`,
    {
      method: "PUT",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
      },
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  console.log(result);
  return result;
};

const updateAvatar = async (avatar) => {
  const request = await fetch(
    "https://nomoreparties.co/v1/plus-cohort-16/users/me/avatar/",
    {
      method: "PATCH",
      headers: {
        authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }
  );
  if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

  const result = await request.json();
  console.log(result);
  return result;
};

export {
  fetchCards,
  fetchProfile,
  updateProfile,
  createCardRequest,
  deleteCard,
  deleteLike,
  addLike,
  updateAvatar,
}; */

class API {
  constructor({ baseUrl, authorization}) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
  }

  async fetchCards() {
    const request = await fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authorization,
      },
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
  }

  async fetchProfile() {
    const request = await fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authorization,
      },
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
  }

  async updateProfile(newName, newAbout){
    const request = await fetch(
        `${this.baseUrl}/users/me`,
        {
          method: "PATCH",
          headers: {
            authorization: this.authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            about: newAbout,
          }),
        }
      );
      if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
    
      const result = await request.json();
      return result;
  }

  async createCardRequest(name,link){
    const request = await fetch(
      `${this.baseUrl}/cards`,
      {
        method: "POST",
        headers: {
          authorization: this.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          link: link,
        }),
      }
    );
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
  }

  async deleteCard(cardId){
    const request = await fetch(
      `${this.baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization:this.authorization,
        },
      }
    );
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
  
    const result = await request.json();
    console.log(result);
    return result;
  }

  async deleteLike(cardId){
    const request = await fetch(
      `${this.baseUrl}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this.authorization,
        },
      }
    );
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
  }

  async addLike(cardId){
    const request = await fetch(
      `${this.baseUrl}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: this.authorization,
        },
      }
    );
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
  
    const result = await request.json();
    console.log(result);
    return result;
  }

  async updateAvatar(avatar){
    const request = await fetch(
      `${this.baseUrl}/users/me/avatar/`,
      {
        method: "PATCH",
        headers: {
          authorization: this.authorization,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatar: avatar,
        }),
      }
    );
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
  
    const result = await request.json();
    console.log(result);
    return result;
  }

}

let api = new API({
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-16",
  authorization: "dec5d51c-e797-4698-837e-5a0bd4b0f1d8",
});

console.log(api);
