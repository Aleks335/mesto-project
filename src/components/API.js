export class Api {
  constructor({ baseUrl, authorization }) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
    this.updateProfile = this.updateProfile.bind(this);
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

  async updateProfile(obj) {
    const request = await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    return result;
  }

  async createCardRequest(obj) {
    const request = await fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
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
  async updateAvatar(obj) {
    const request = await fetch(`${this.baseUrl}/users/me/avatar/`, {
      method: "PATCH",
      headers: {
        authorization: this.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    if (!request.ok) return Promise.reject(`Ошибка: ${request.status}`);

    const result = await request.json();
    console.log(result);
    return result;
  }
}
