export class Api {
  constructor({ baseUrl, authorization }) {
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

  async updateProfile(newName, newAbout) {
    const request = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
  }

  async createCardRequest(name, link) {
    const request = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
  }

  async deleteCard(cardId) {
    const request = await fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
  }
  async deleteLike(cardId) {
    const request = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this.authorization,
      },
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);
    const result = await request.json();
    return result;
  }
  async addLike(cardId) {
    const request = await fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: this.authorization,
      },
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
  }
  async updateAvatar(avatar) {
    const request = await fetch(`${this.baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
  }
}
